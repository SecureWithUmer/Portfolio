interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-md bg-muted/50 p-4 overflow-x-auto">
      <pre>
        <code className={`language-${language} text-sm text-foreground/90`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
}
