
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { User, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CrewEssentials } from '@/components/CrewEssentials';


export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const image = getPlaceholderImage(post.imageId);
  const authorImage = getPlaceholderImage('user-avatar');

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose dark:prose-invert max-w-none">
        {image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
                <Image
                    src={image.imageUrl}
                    alt={post.title}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )}

        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
        
        <div className="flex items-center gap-4 my-4 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    {authorImage && <AvatarImage src={authorImage.imageUrl} data-ai-hint={authorImage.imageHint} />}
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
