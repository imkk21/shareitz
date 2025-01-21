// src/components/ShareForm.tsx
"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../firebase";

type ShareFormProps = {
  username: string;
};

const ShareForm = ({ username }: ShareFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const messagesRef = ref(database, `messages/${username}`);
      await push(messagesRef, { text, timestamp: new Date().toISOString() });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your code snippet here..."
        className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        rows={6}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
      >
        Share Snippet
      </button>
    </form>
  );
};

export default ShareForm;