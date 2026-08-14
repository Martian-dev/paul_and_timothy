import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/spiritual-gifts")({
  head: () => ({
    meta: [
      { title: "Spiritual Gifts Assessment" },
      { name: "description", content: "Discover your spiritual gifts." },
    ],
  }),
  component: SpiritualGiftsPage,
});

function SpiritualGiftsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />

      <main className="flex-1 px-6 pt-36 pb-24 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl font-medium leading-[1.05] md:text-7xl text-primary">
            Spiritual Gifts Assessment
          </h1>
          <p className="mt-8 text-lg text-muted-foreground">
            This assessment is coming soon. Please check back later.
          </p>

          <Link
            to="/assessment"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Assessments
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
