
"use client";

import { useState, useRef, FormEvent, useEffect } from 'react';
import { askUmerAnything, type AskUmerOutput } from '@/ai/flows/ask-umer-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

export function AskMeAnythingWidget() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { id: `user-${Date.now()}`, type: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery(''); 
    setIsLoading(true);
    
    try {
      const output: AskUmerOutput = await askUmerAnything({ query: currentQuery });
      const aiMessage: Message = { id: `ai-${Date.now()}`, type: 'ai', text: output.answer };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error asking AI:", err);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      });
      const errorMessage: Message = { id: `error-${Date.now()}`, type: 'ai', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md sm:max-w-lg mx-auto shadow-xl border-primary/50">
      <CardHeader className="px-4 pt-4 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-primary text-lg sm:text-xl">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
          Ask Me Anything (AI Powered)
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Have a question about cybersecurity or my work? Ask my AI assistant! (Based on my profile & general knowledge)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:p-6">
        <ScrollArea className="h-60 sm:h-72 w-full rounded-md border border-border/70 p-3 sm:p-4 bg-secondary/30">
          <div className="space-y-3 sm:space-y-4">
            {messages.length === 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground text-center py-8 sm:py-10 italic">
                No messages yet. Ask something like "What is ethical hacking?" or "Tell me about your MDR expertise."
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground border border-border/50 rounded-bl-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1 sm:pt-2">
          <Input
            id="aiQuery"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question here..."
            disabled={isLoading}
            aria-label="Ask a question"
            className="flex-grow h-9 sm:h-10"
          />
          <Button type="submit" disabled={isLoading || !query.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground h-9 sm:h-10 px-3 sm:px-4">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send question</span>
          </Button>
        </form>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-2 sm:p-6 sm:pt-3">
        <p className="text-xs text-muted-foreground/80 italic text-center w-full">
          AI responses are generated and may not always be perfectly accurate. For critical matters, please contact me directly.
        </p>
      </CardFooter>
    </Card>
  );
}
