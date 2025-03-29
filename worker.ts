/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    try {
      // Initialize AI with proper error handling
      const ai = new Ai(env.AI);

      // Check if AI is properly initialized
      if (!ai || typeof ai.run !== "function") {
        throw new Error("AI binding not properly initialized");
      }

      // Example: Text generation
      const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
        prompt: "Tell me a joke about Cloudflare",
      });

      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error:any) {
      return new Response(
        JSON.stringify({
          error: error.message,
          stack: error.stack,
          note: "Make sure you're using the correct AI binding configuration",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
