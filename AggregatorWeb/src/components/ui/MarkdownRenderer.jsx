import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { FiAlertCircle, FiCopy, FiCheck } from 'react-icons/fi';
import 'katex/dist/katex.min.css';
import mermaid from 'mermaid';

const MermaidDiagram = ({ code }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const renderMermaid = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          securityLevel: 'loose',
          suppressErrorRendering: true
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);

        if (isMounted) {
          setSvg(svg);
          setError('');
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(`Ошибка рендеринга диаграммы: ${err.message}`);
          setIsLoading(false);
          console.error('Ошибка рендеринга Mermaid:', err);
        }
      }
    };

    renderMermaid();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error) {
    console.error('Ошибка рендеринга Mermaid:', error);
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
          <FiAlertCircle />
          <span className="font-medium">Ошибка диаграммы</span>
        </div>
        <pre className="text-sm bg-white dark:bg-gray-800 p-3 rounded overflow-x-auto">
          {code}
        </pre>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Рендеринг диаграммы...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-diagram my-4 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

const CodeBlock = ({ children, className, inline, ...props }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, '') : '';
  const isMermaid = language === 'mermaid';
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Не удалось скопировать код:', err);
    }
  };

  if (isMermaid && !inline) {
    return <MermaidDiagram code={codeContent} />;
  }

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
        {children}
      </code>
    );
  }

  return (
    <div className="relative my-4 group">
      {language && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Копировать код"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      )}
      <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto text-sm">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownRenderer = ({ content }) => {
  const components = {
    code: CodeBlock,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-3 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-3 ml-6 list-disc space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-3 ml-6 list-decimal space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="pl-2">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 pl-4 border-l-4 border-primary-300 dark:border-primary-600 bg-gray-50 dark:bg-gray-800/50 py-2 rounded-r">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr>{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm">{children}</td>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:underline"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <div className="my-4">
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
          loading="lazy"
        />
        {alt && (
          <div className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            {alt}
          </div>
        )}
      </div>
    ),
    hr: () => (
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    del: ({ children }) => (
      <del className="line-through text-gray-500">{children}</del>
    ),
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkParse]}
        rehypePlugins={[remarkRehype, rehypeKatex, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;