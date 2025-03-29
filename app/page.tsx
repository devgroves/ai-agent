import ChatInterface from '@/components/AiAgent'
import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Ai Agent</h1>
      <ChatInterface />
      {/* <p className="text-center text-gray-500 mt-8">
        Powered by Cloudflare Workers AI and Llama 2 7B
      </p> */}
    </main>
  )
}
