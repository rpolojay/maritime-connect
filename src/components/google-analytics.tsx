'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { consent } = useCookieConsent();

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (consent === 'granted' && measurementId) {
      const url = pathname + searchParams.toString();
      pageview(url);
    }
  }, [pathname, searchParams, consent, measurementId]);

  if (consent !== 'granted' || !measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
