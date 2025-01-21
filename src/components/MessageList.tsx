"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

type Message = {
  text: string;
  timestamp: string;
};

type MessageListProps = {
  username: string;
};

const MessageList = ({ username }: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${username}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data) as Message[];
        setMessages(messageList);
      }
    });
  }, [username]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700"
        >
          <pre className="text-gray-100 whitespace-pre-wrap font-mono">
            {message.text}
          </pre>
          <small className="text-gray-400">
            {new Date(message.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;