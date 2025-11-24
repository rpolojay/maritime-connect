
import { Anchor } from "lucide-react";
import Link from "next/link";

export default function EmployersPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 text-center">
        <Anchor className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">This page is no longer available.</h1>
        <p className="mt-4 text-muted-foreground">
            Our platform is now dedicated exclusively to helping maritime professionals find their next role.
        </p>
        <div className="mt-6">
            <Link href="/jobs" className="text-primary hover:underline">
                Explore Job Openings
            </Link>
        </div>
    </div>
  );
}
