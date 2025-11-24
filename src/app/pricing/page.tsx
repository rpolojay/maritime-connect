
import { Anchor } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 text-center">
        <Anchor className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">This page is no longer available.</h1>
        <p className="mt-4 text-muted-foreground">
            We are a free platform for job seekers. There are no fees for finding or applying to jobs.
        </p>
        <div className="mt-6">
            <Link href="/jobs" className="text-primary hover:underline">
                Start Your Job Search
            </Link>
        </div>
    </div>
  );
}
