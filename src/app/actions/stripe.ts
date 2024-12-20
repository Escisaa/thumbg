"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { env } from "~/env";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import Stripe from "stripe";

export const redirectToBillingSession = async (priceId: string) => {
  // Ensure priceId is valid
  if (
    ![env.STRIPE_10_PACK, env.STRIPE_25_PACK, env.STRIPE_100_PACK].includes(
      priceId,
    )
  ) {
    throw new Error("Invalid priceId");
  }

  // Get the current session
  const serverSession = await getServerSession(authOptions);

  if (!serverSession?.user?.id) {
    throw new Error("User not authenticated");
  }

  // Retrieve the user from the database
  const user = await db.user.findUnique({
    where: {
      id: serverSession.user.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  // Ensure the user has a Stripe customer ID
  if (!user?.stripeCustomerId) {
    throw new Error("User has no stripeCustomerId");
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  // Create a checkout session with Stripe
  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    customer: user.stripeCustomerId,
    mode: "payment",
    // Using absolute URL to ensure correct redirect
    success_url: "https://www.thumbgo.co/dashboard",
    // Keep user's authentication state
    client_reference_id: serverSession.user.id,
  });

  // Ensure that the session URL was created successfully
  if (!session.url) throw new Error("No session URL");

  // Redirect the user to the Stripe checkout page
  redirect(session.url);
};
