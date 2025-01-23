"use client";

import { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../firebase";
import { FaCopy, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"; // Import icons

type Message = {
  id: string;
  text: string;
  timestamp: string;
};

type MessageListProps = {
  username: string;
};

const MessageList = ({ username }: MessageListProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // Track which message is being edited
  const [editedText, setEditedText] = useState(""); // Store the edited text

  useEffect(() => {
    const messagesRef = ref(database, `messages/${username}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, message]) => ({
          id,
          ...(message as Omit<Message, "id">),
        }));
        setMessages(messageList);
      }
    });
  }, [username]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handleDelete = (id: string) => {
    const messageRef = ref(database, `messages/${username}/${id}`);
    remove(messageRef)
      .then(() => {
        alert("Message deleted!");
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  const handleEdit = (id: string, newText: string) => {
    const messageRef = ref(database, `messages/${username}/${id}`);
    update(messageRef, { text: newText })
      .then(() => {
        setEditingId(null); // Exit edit mode
        alert("Message updated!");
      })
      .catch((error) => {
        console.error("Error updating message:", error);
      });
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 relative"
        >
          {editingId === message.id ? (
            // Edit mode
            <div className="flex flex-col space-y-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                rows={4}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(message.id, editedText)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
                >
                  <FaCheck className="mr-2" /> Save
                </button>
                <button
                  onClick={() => setEditingId(null)} // Cancel edit
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          ) : (
            // Display mode
            <div className="flex justify-between items-start">
              <pre className="text-gray-100 whitespace-pre-wrap font-mono flex-1">
                {message.text}
              </pre>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleCopy(message.text)}
                  className="text-gray-400 hover:text-blue-500 transition duration-200"
                  title="Copy"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => {
                    setEditingId(message.id); // Enter edit mode
                    setEditedText(message.text); // Set initial text for editing
                  }}
                  className="text-gray-400 hover:text-green-500 transition duration-200"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(message.id)}
                  className="text-gray-400 hover:text-red-500 transition duration-200"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
          <small className="text-gray-400 block mt-2">
            {new Date(message.timestamp).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default MessageList;