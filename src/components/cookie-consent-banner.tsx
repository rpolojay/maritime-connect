
'use client';

import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieConsentBanner() {
  const { consent, giveConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show the banner if consent has not been given yet.
    // We also add a small delay to prevent layout shifts on page load.
    const timer = setTimeout(() => {
      if (consent === null) {
        setIsVisible(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [consent]);


  const handleAccept = () => {
    giveConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    giveConsent(false);
    setIsVisible(false);
  };

  if (!isVisible || consent !== null) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <Card className="container mx-auto max-w-4xl shadow-2xl">
        <CardHeader>
          <CardTitle>We Value Your Privacy</CardTitle>
          <CardDescription>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and
            analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleAccept} className="w-full sm:w-auto">Accept All</Button>
          <Button onClick={handleDecline} variant="outline" className="w-full sm:w-auto">Decline</Button>
          <Button variant="link" asChild className="w-full sm:w-auto justify-start sm:justify-center px-0">
             <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
