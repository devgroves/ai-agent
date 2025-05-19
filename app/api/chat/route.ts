import { NextResponse } from "next/server";

export const runtime = "edge"; // Important for Vercel Edge Functions

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages }:any = await req.json();
  const aiRequest = JSON.stringify({  max_tokens: 2048, messages });
  console.log("messages", aiRequest);

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages, max_tokens: 2048 }),
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudflare API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("response data ", data)
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling Cloudflare AI:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
