import type { Metadata } from 'next';
import { PageTitle } from '@/components/ui/page-title';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Tag } from 'lucide-react';

// This is mock data. In a real app, you'd fetch this based on the slug.
const MOCK_BLOG_POSTS = {
  'demystifying-zero-trust-architecture': {
    title: 'Demystifying Zero Trust Architecture',
    date: '2024-07-15',
    categories: ['Security Models', 'Zero Trust', 'Network Security'],
    content: `
Zero Trust is a security framework requiring all users, whether in or outside the organization’s network, to be authenticated, authorized, and continuously validated for security configuration and posture before being granted or keeping access to applications and data.

Key Principles:
- **Verify Explicitly:** Always authenticate and authorize based on all available data points.
- **Use Least Privilege Access:** Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA).
- **Assume Breach:** Minimize blast radius and segment access. Verify end-to-end encryption.

Example of a policy check (conceptual):
\`\`\`json
{
  "user": "user@example.com",
  "device_compliance": "compliant",
  "location": "trusted_network",
  "application_risk": "low",
  "action": "allow_access"
}
\`\`\`
Implementing Zero Trust is a journey, not a destination. It involves a shift in mindset and a strategic approach to cybersecurity.
    `,
  },
  'the-rise-of-ai-in-cybersecurity': {
    title: 'The Rise of AI in Cybersecurity: Friend or Foe?',
    date: '2024-06-28',
    categories: ['AI', 'Threat Landscape', 'Future Tech'],
    content: `
Artificial Intelligence (AI) is rapidly transforming the cybersecurity landscape. On one hand, AI-powered tools offer unprecedented capabilities for threat detection, anomaly identification, and automated response. Security teams can leverage machine learning algorithms to analyze vast amounts of data and identify subtle patterns indicative of malicious activity.

However, AI also presents new challenges. Attackers can use AI to:
- Craft more sophisticated phishing emails.
- Develop adaptive malware that evades traditional defenses.
- Automate vulnerability discovery.

A simulated Python snippet for basic anomaly detection:
\`\`\`python
def is_anomalous(network_traffic_volume, baseline_volume, threshold_std_dev=3):
    """
    Checks if network traffic volume is anomalous based on a simple standard deviation threshold.
    """
    deviation = abs(network_traffic_volume - baseline_volume)
    # In a real scenario, standard deviation would be calculated from historical data
    standard_deviation_example = baseline_volume * 0.1 
    
    if deviation > (threshold_std_dev * standard_deviation_example):
        return True
    return False

# Example usage:
current_volume = 1500  # e.g., GB
historical_avg_volume = 1000 # e.g., GB

if is_anomalous(current_volume, historical_avg_volume):
    print("Alert: Anomalous network traffic detected!")
else:
    print("Network traffic within normal parameters.")
\`\`\`
The future of cybersecurity will involve an ongoing cat-and-mouse game between AI-driven attacks and AI-powered defenses.
    `,
  },
   'essential-password-hygiene-practices': {
    title: 'Essential Password Hygiene Practices for Everyone',
    date: '2024-05-10',
    categories: ['Best Practices', 'User Security', 'Passwords'],
    content: `
Passwords are often the first line of defense. Here are key practices:
1.  **Use Strong, Unique Passwords:** Combine uppercase, lowercase, numbers, and symbols. Aim for at least 12 characters.
2.  **Enable Multi-Factor Authentication (MFA):** Adds an extra layer of security.
3.  **Use a Password Manager:** Securely store and generate complex passwords.
4.  **Change Default Passwords:** Especially for routers and IoT devices.
5.  **Be Wary of Phishing:** Don't enter passwords on suspicious sites.
    `,
  },
  'understanding-social-engineering-attacks': {
    title: 'Understanding Social Engineering Attacks and How to Avoid Them',
    date: '2024-04-22',
    categories: ['Social Engineering', 'Human Factor', 'Awareness'],
    content: `
Social engineering manipulates people into performing actions or divulging confidential information. Common types include:
- **Phishing:** Deceptive emails, messages, or websites.
- **Pretexting:** Creating a fabricated scenario to gain trust.
- **Baiting:** Offering a false promise to lure victims.
- **Tailgating:** Following an authorized person into a restricted area.

How to protect yourself:
- Be skeptical of unsolicited communications.
- Verify identities through separate channels.
- Don't click suspicious links or download unknown attachments.
- Report suspicious activity.
    `,
  }
};

type BlogPostData = {
  title: string;
  date: string;
  categories: string[];
  content: string;
};

async function getPostData(slug: string): Promise<BlogPostData | null> {
  // In a real app, fetch from a CMS or database
  return MOCK_BLOG_POSTS[slug as keyof typeof MOCK_BLOG_POSTS] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: post.title,
    description: post.content.substring(0, 150) + '...', // Simple excerpt
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <div>
        <PageTitle>Post Not Found</PageTitle>
        <p className="text-center text-muted-foreground">Sorry, the blog post you are looking for does not exist.</p>
      </div>
    );
  }

  // Basic parsing for content that might include code blocks
  const contentParts = post.content.split(/(\`\`\`[\s\S]*?\`\`\`)/g);

  return (
    <article className="max-w-3xl mx-auto py-8">
      <PageTitle>{post.title}</PageTitle>
      <div className="mb-6 text-center">
        <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline" className="font-code text-xs border-accent text-accent">
              <Tag className="h-3 w-3 mr-1"/>{category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="prose prose-invert dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground/90 prose-code:text-accent prose-code:font-code prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card">
        {contentParts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const languageMatch = part.match(/^```(\w+)?\n/);
            const language = languageMatch ? languageMatch[1] : undefined;
            const code = part.replace(/^```\w*\n/, '').replace(/\n```$/, '');
            return <CodeBlock key={index} code={code} language={language} />;
          }
          // Replace newline characters with <br /> for simple text formatting
          return part.split('\n').map((line, lineIndex) => (
            <span key={`${index}-${lineIndex}`}>
              {line}
              {lineIndex < part.split('\n').length - 1 && <br />}
            </span>
          ));
        })}
      </div>
    </article>
  );
}

// This function helps Next.js know which slugs are available at build time.
export async function generateStaticParams() {
  return Object.keys(MOCK_BLOG_POSTS).map((slug) => ({
    slug,
  }));
}
