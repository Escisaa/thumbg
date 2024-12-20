import { headers } from "next/headers";
import Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    // Get the raw request body as text
    const body = await req.text(); // Important to get raw body

    const sig = headers().get("Stripe-Signature");
    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      console.error("Missing signature or webhook secret");
      return new Response("Missing signature or webhook secret", {
        status: 400,
      });
    }

    // Pass the raw body and signature to constructEvent
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("Webhook event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve the session with line items
      const retrievedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items"] },
      );

      const priceId = retrievedSession.line_items?.data[0]?.price?.id;
      const customerId = session.customer as string;

      if (!priceId || !customerId) {
        console.error("Missing priceId or customerId", { priceId, customerId });
        return new Response("Missing price or customer information", {
          status: 400,
        });
      }

      // Determine credits to add
      let creditsToAdd = 0;
      switch (priceId) {
        case env.STRIPE_10_PACK:
          creditsToAdd = 10;
          break;
        case env.STRIPE_25_PACK:
          creditsToAdd = 25;
          break;
        case env.STRIPE_100_PACK:
          creditsToAdd = 100;
          break;
        default:
          console.error("Invalid priceId:", priceId);
          return new Response("Invalid price ID", { status: 400 });
      }

      // Find user and update credits
      try {
        const user = await db.user.findUnique({
          where: { stripeCustomerId: customerId },
          select: { id: true, credits: true },
        });

        if (!user) {
          console.error("User not found for stripeCustomerId:", customerId);
          return new Response("User not found", { status: 404 });
        }

        const updatedUser = await db.user.update({
          where: { id: user.id },
          data: { credits: { increment: creditsToAdd } },
        });

        console.log("Credits updated successfully", {
          userId: user.id,
          oldCredits: user.credits,
          newCredits: updatedUser.credits,
          added: creditsToAdd,
        });

        return new Response(
          JSON.stringify({
            received: true,
            creditsAdded: creditsToAdd,
            newTotal: updatedUser.credits,
          }),
        );
      } catch (dbError) {
        console.error("Database error:", dbError);
        return new Response("Database error", { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }));
  } catch (err) {
    console.error("Webhook processing error:", err);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      { status: 400 },
    );
  }
}
