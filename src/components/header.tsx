
'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Find a Job' },
  { href: '/resume-builder', label: 'Resume Builder' },
  { href: '/get-hired', label: 'Get Hired' },
  { href: '/training-partners', label: 'Training Partners' },
  { href: '/blog', label: 'Blog' },
  { href: '/c1d-visa', label: 'C1/D Visa Guide' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Image src="https://narrow-aqua-9vquhxbesq.edgeone.app/SC%20Enhanced.jpg" alt="Selective Crew Logo" width={48} height={48} className="rounded-md" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Selective Crew
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/jobs">Find a Job</Link>
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex h-full flex-col">
              <div className="flex flex-1 flex-col gap-4 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2 p-6">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/jobs" onClick={() => setIsOpen(false)}>Find a Job</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
