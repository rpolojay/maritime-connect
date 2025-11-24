
import { ReactNode } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Chatbot } from '@/components/chatbot';
import { FirebaseClientProvider } from '@/firebase';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { GoogleAnalytics } from '@/components/google-analytics';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';


export const metadata = {
  title: 'Selective Crew | Maritime Recruitment',
  description: 'Your gateway to a successful career in the maritime industry. Find cruise ship jobs, build your resume, and connect with top employers.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FirebaseClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Breadcrumbs />
              {children}
            </main>
            <Footer />
            <Chatbot />
            <Toaster />
            <CookieConsentBanner />
            <GoogleAnalytics />
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
