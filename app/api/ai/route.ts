import { NextResponse } from "next/server";

export const runtime = "edge"; // Important for Vercel Edge Functions

export async function POST(request: Request) {
  try {
    const cloudflareWorkerUrl = process.env.CLOUDFLARE_WORKER_URL;

    if (!cloudflareWorkerUrl) {
      throw new Error("CLOUDFLARE_WORKER_URL is not defined");
    }

    const { prompt } = (await request.json()) as { prompt: string };

    const response = await fetch(cloudflareWorkerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling Cloudflare Worker AI:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
