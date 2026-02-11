
import { PageTitle } from '@/components/ui/page-title';
import { AskMeAnythingWidget } from '@/components/ai/ask-me-anything';
import { AiTipGenerator } from '@/components/ai/ai-tip-generator';
import { SectionTitle } from '@/components/ui/section-title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant | Umer Farooq',
  description: 'Interact with AI-powered tools, ask cybersecurity questions, and get personalized security tips from an AI assistant trained on Umer Farooq\'s expertise.',
};

export default function AiAssistantPage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <PageTitle subtitle="Interact with AI-powered tools and get instant insights.">
        AI Assistant Hub
      </PageTitle>

      <section id="ask-ai-widget" className="py-4 sm:py-6">
        <SectionTitle className="text-center">Ask My AI Assistant</SectionTitle>
        <AskMeAnythingWidget />
      </section>

      <section id="ai-tip-generator" className="py-4 sm:py-6">
        <SectionTitle className="text-center">Cybersecurity Tip Generator</SectionTitle>
        <AiTipGenerator />
      </section>
    </div>
  );
}
