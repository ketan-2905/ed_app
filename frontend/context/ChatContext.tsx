"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import apiClient from "@/lib/axios"; // Ensure axios client is configured
import { queryChatbot } from "@/lib/api";

// Define Message Type
interface Message {
  id: number;
  type: "user" | "bot";
  message: string;
}

// Define Chat Context Type
interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  sendMessage: (sessionId: string) => Promise<void>;
  loading: boolean;
  clearChat: () => void;
}

// Create Context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Chat Provider Component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Function to send a message
  const sendMessage = async (sessionId: string) => {
    if (!input.trim()) return;

    const newMessage: Message = { id: Date.now(), type: "user", message: input };
    setMessages((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await queryChatbot(sessionId, input)

      if (response) {
        const botMessage: Message = { id: Date.now() + 1, type: "bot", message: response};
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [...prev, { id: Date.now() + 2, type: "bot", message: "Unexpected response from server." }]);
      }
    } catch (error: any) {
      console.error("Chat query failed:", error);
      setMessages((prev) => [...prev, { id: Date.now() + 3, type: "bot", message: "Error: Unable to fetch response." }]);
    }

    setInput("");
    setLoading(false);
  };

  const clearChat = useCallback(() => {
    setMessages([]);
  },[setMessages])

  return (
    <ChatContext.Provider value={{ messages, input, setInput, sendMessage, loading , clearChat}}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom Hook to use Chat Context
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
