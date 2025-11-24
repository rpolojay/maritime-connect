
'use client';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image src="https://narrow-aqua-9vquhxbesq.edgeone.app/SC%20Enhanced.jpg" alt="Selective Crew Logo" width={48} height={48} className="rounded-md" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Selective Crew
              </span>
            </Link>
          </div>
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground md:gap-8 lg:col-span-2 lg:justify-end">
            <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link href="/jobs" className="hover:text-foreground transition-colors">Jobs</Link></li>
            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link href="/c1d-visa" className="hover:text-foreground transition-colors">C1/D Visa Guide</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="mt-8 border-t pt-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <ul className="flex justify-center gap-4 sm:justify-start">
                    <li>
                    <a href="https://www.facebook.com/selectivecrew/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Visit our Facebook page (opens in a new tab)">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-5 w-5" />
                    </a>
                    </li>
                    <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Visit our Twitter profile (opens in a new tab)">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-5 w-5" />
                    </Link>
                    </li>
                    <li>
                    <a href="https://www.linkedin.com/in/selectivecrew/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Connect with us on LinkedIn (opens in a new tab)">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5" />
                    </a>
                    </li>
                </ul>
                <p className="mt-4 text-center text-sm text-muted-foreground sm:mt-0 sm:text-right">
                    © {new Date().getFullYear()} Selective Crew. All rights reserved.
                </p>
            </div>
             <Alert className="mt-8 bg-secondary/50 border-secondary">
                <ShieldCheck className="h-5 w-5" />
                <AlertTitle className="font-bold">No Placement Fees Policy</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                    Selective Crew is a professional recruitment agency and strictly adheres to international maritime labor standards. We do not charge candidates any fees for recruitment, interviews, or job placement services. Any training or certification recommended by our partners is optional and separate from our hiring process.
                </AlertDescription>
            </Alert>
        </div>
      </div>
    </footer>
  );
}
