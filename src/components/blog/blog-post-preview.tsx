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
  // content: string; // Full content would be for the individual blog post page
}

interface BlogPostPreviewProps {
  post: BlogPost;
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl text-primary hover:underline">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-sm mb-4">
          {post.excerpt}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline" className="font-code text-xs border-accent text-accent">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${post.slug}`} className="text-sm text-accent font-semibold hover:underline flex items-center">
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
