"use server";

import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/server/auth";
import {
  ImageIcon,
  Zap,
  Clock,
  Palette,
  Wand2,
  Check,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import PricingCard from "~/components/pricing-card";

// Footer Component
function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <ImageIcon className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built with ❤️ for content creators. © 2024 ThumbGO.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/terms"
            className="text-sm font-medium underline underline-offset-4"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium underline underline-offset-4"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

// Features Data
const features = [
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Save Time",
    description:
      "Generate professional thumbnails in seconds instead of hours.",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "Consistent Branding",
    description: "Maintain your brand identity across all your content.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Higher Engagement",
    description: "Get more clicks with eye-catching, professional thumbnails.",
  },
  {
    icon: <Wand2 className="h-10 w-10" />,
    title: "AI-Powered",
    description: "Smart algorithms ensure perfect text placement every time.",
  },
];

// FAQ Data
const faqs = [
  {
    question: "How does ThumbGO work?",
    answer:
      "ThumbGO uses advanced algorithms to automatically position text and images in your thumbnails. Simply upload your background image, add your text, and our AI will create a professional thumbnail in seconds.",
  },
  {
    question: "Can I customize the generated thumbnails?",
    answer:
      "Yes! You can customize colors, fonts, text position, and more. Our tool provides full flexibility while maintaining professional quality.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all major image formats including JPG, PNG, and WebP. The generated thumbnails can be downloaded in your preferred format.",
  },
  {
    question: "Is there a limit to how many thumbnails I can create?",
    answer:
      "The number of thumbnails you can create depends on your subscription plan. Free users get 3 thumbnails, while paid plans offer more generous limits.",
  },
];

// Comparison Section
function Comparison() {
  return (
    <section className="container py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
          Why Choose ThumbGO?
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          See the difference professional thumbnails make
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {/* Without ThumbGO */}
        <div className="rounded-lg border bg-red-50/50 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-red-600">Without ThumbGO</h3>
            <ul className="mt-4 space-y-3 text-red-700">
              <li className="flex items-center">
                <span className="mr-2">✕</span>
                Hours spent in photo editing software
              </li>
              <li className="flex items-center">
                <span className="mr-2">✕</span>
                Inconsistent branding
              </li>
              <li className="flex items-center">
                <span className="mr-2">✕</span>
                Lower click-through rates
              </li>
              <li className="flex items-center">
                <span className="mr-2">✕</span>
                Basic, unprofessional look
              </li>
            </ul>
          </div>
        </div>

        {/* With ThumbGO */}
        <div className="rounded-lg border bg-green-50/50 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-600">With ThumbGO</h3>
            <ul className="mt-4 space-y-3 text-green-700">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Generate thumbnails in seconds
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Consistent brand identity
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Higher engagement rates
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Professional, eye-catching designs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Home Page
export default async function HomePage() {
  const user = await getServerSession(authOptions);

  return (
    <div className="flex h-full flex-col items-center overflow-y-scroll px-6 py-6">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ImageIcon className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-blue-600">ThumbGO</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline"
            >
              Pricing
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline">
              FAQ
            </Link>
            <Button asChild>
              <Link href={user ? "/dashboard" : "/signin"}>
                {user ? "Go to Dashboard" : "Sign In"}
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Framer */}
      <section className="container px-4 py-24 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Easier Thumbnails <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              for Creators
            </span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Thumbnails with text behind the foreground are popular, but take
            time to make manually. Generate them automatically with this tool.
          </p>
          <Image
            src="/main.png"
            alt="Thumbnail Generator Demo"
            width={900}
            height={250}
            className="rounded-md shadow-lg"
            priority
          />
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href={user ? "/dashboard" : "/signup"}>
                {user ? "Go to Dashboard" : "Try for Free"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <Comparison />

      {/* Features Section */}
      <section className="container py-24" id="features">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to create stunning thumbnails
          </p>
        </div>
        <div className="mx-auto mt-16 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-24" id="pricing">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl">
            Pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Choose the plan that's right for you
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          <PricingCard pricing="$2" credits="10" />
          <PricingCard pricing="$5" credits="25" />
          <PricingCard pricing="$10" credits="100" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-24" id="faq">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
            FAQ
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Frequently Asked Questions
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-16 w-full max-w-2xl"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
