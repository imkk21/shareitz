// src/app/[username]/page.tsx
"use client";

import ShareForm from "../../components/ShareForm";
import MessageList from "../../components/MessageList";
import { useParams } from "next/navigation";

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-blue-400">Shareitz</span> -{" "}
          <span className="text-purple-400">{username}</span>
        </h1>

        {/* Share Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <ShareForm username={username} />
        </div>

        {/* Message List */}
        <div className="space-y-4">
          <MessageList username={username} />
        </div>
      </div>
    </div>
  );
}