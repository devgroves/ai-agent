/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data:any = await res.json();
      setResponse(data.result?.response || data.message || JSON.stringify(data));
    } catch (error) {
      setResponse('Error calling the AI service');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Cloudflare AI with Next.js</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Enter your prompt:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {response && (
          <div>
            <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
            <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}