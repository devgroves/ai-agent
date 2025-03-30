/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import ReactMarkdown from 'react-markdown';

// Message type
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages,
            userMessage
          ]
        }),
      });

      const data: any = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.result.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-3xl flex flex-col flex-grow bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <h1 className="text-xl font-bold text-center">AI Agent</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-2xl ${msg.role === 'user' ? 'bg-blue-100 self-end ' : 'bg-gray-100 self-start'}`}
            >
              <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
              <MDXProvider>
                <ReactMarkdown components={{ p: ({ node, ...props }) => <p className="mt-1" {...props} /> }}>
                  {msg.content}
                </ReactMarkdown>
              </MDXProvider>
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-gray-200 text-center">Thinking...</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex items-center sticky bottom-0 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg outline-none"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}