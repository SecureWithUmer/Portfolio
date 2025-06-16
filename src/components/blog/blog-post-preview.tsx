import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CalendarDays } from 'lucide-react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
}

interface BlogPostPreviewProps {
  post: BlogPost;
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl text-primary hover:underline">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          {post.excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline" className="font-code text-xs border-accent text-accent">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-3 pb-4">
        <Link href={`/blog/${post.slug}`} className="text-xs sm:text-sm text-accent font-semibold hover:underline flex items-center">
          Read More <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
