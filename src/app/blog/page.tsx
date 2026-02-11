import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { BlogPostPreview, type BlogPost } from '@/components/blog/blog-post-preview';

export const metadata: Metadata = {
  title: 'Cybersecurity Blog',
  description: 'Insights on cybersecurity trends, best practices, and personal reflections by Umer Farooq.',
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'demystifying-zero-trust-architecture',
    title: 'Demystifying Zero Trust Architecture',
    date: '2024-07-15',
    excerpt: 'An introduction to the principles of Zero Trust and how it can revolutionize your organization\'s security posture.',
    categories: ['Security Models', 'Zero Trust', 'Network Security'],
  },
  {
    id: '2',
    slug: 'the-rise-of-ai-in-cybersecurity',
    title: 'The Rise of AI in Cybersecurity: Friend or Foe?',
    date: '2024-06-28',
    excerpt: 'Exploring the dual role of Artificial Intelligence in both enhancing cyber defenses and empowering attackers.',
    categories: ['AI', 'Threat Landscape', 'Future Tech'],
  },
  {
    id: '3',
    slug: 'essential-password-hygiene-practices',
    title: 'Essential Password Hygiene Practices for Everyone',
    date: '2024-05-10',
    excerpt: 'Simple yet effective tips to create and manage strong passwords, protecting your digital identity.',
    categories: ['Best Practices', 'User Security', 'Passwords'],
  },
  {
    id: '4',
    slug: 'understanding-social-engineering-attacks',
    title: 'Understanding Social Engineering Attacks and How to Avoid Them',
    date: '2024-04-22',
    excerpt: 'A deep dive into the psychology behind social engineering and practical steps to recognize and mitigate these threats.',
    categories: ['Social Engineering', 'Human Factor', 'Awareness'],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <PageTitle subtitle="Stay updated with the latest in cybersecurity.">
        Cyber Insights Blog
      </PageTitle>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogPosts.map((post) => (
          <BlogPostPreview key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
