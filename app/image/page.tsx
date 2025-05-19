/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage("");

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setImage(url);
      } else {
        console.error("Image generation failed");
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Text-to-Image Generator
        </h1>
        <p className="text-gray-500">Powered by Cloudflare AI</p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Describe your image..."
          />
          <button
            onClick={generateImage}
            disabled={loading}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {image && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Generated Image</h2>
            <img
              src={image}
              alt="Generated"
              className="w-full rounded-lg shadow-md border border-gray-200"
            />
          </div>
        )}
      </div>
    </main>
  );
}
