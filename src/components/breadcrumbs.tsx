
'use client';

import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Breadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname) return null;

  // Since we removed locales, segments are simpler.
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on the home page
  if (segments.length === 0) {
    return null;
  }
  
  const breadcrumbSegments = segments;

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto py-4">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-foreground">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </li>
        {breadcrumbSegments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === breadcrumbSegments.length - 1;
          
          let segmentText = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          // Don't show numeric IDs (like for a job or blog post)
          if (/^[0-9a-f-]+$/.test(segment) && isLast) {
             return null;
          }

          if (isLast) {
            return (
               <li key={segment} className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">{segmentText}</span>
              </li>
            )
          }

          return (
            <li key={segment} className="flex items-center gap-1.5">
              <ChevronRight className="h-4 w-4" />
              <Link href={href} className="hover:text-foreground">
                {segmentText}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
