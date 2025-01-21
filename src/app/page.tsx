"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Shareitz</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Share and collaborate on code snippets with your team.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Get Started
          </button>
        </form>
      </div>

      <footer className="mt-10 text-center text-gray-400">
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://github.com/imkk21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            imkk21
          </a>
        </p>
        <p className="text-sm mt-2">
          Source code available on{" "}
          <a
            href="https://github.com/imkk21/shareitz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}