
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { posts } from '@/lib/posts';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Selective Crew Blog | Maritime News & Career Advice',
  description: 'Explore the latest in maritime industry news, career advice for seafarers, and updates from the Selective Crew team.',
};

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Selective Crew Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Your source for maritime industry news, career tips, and life at sea.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const image = getPlaceholderImage(post.imageId);
          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  {image && (
                     <div className="aspect-video relative w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={image.imageUrl}
                          alt={post.title}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                     </div>
                  )}
                  <CardTitle className="pt-4 text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
