
import React, { useState, useEffect } from "react";

interface MarqueeData {
  messages: string[];
}

export const Marquee: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadMarqueeMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [messages.length]);

  const loadMarqueeMessages = async () => {
    try {
      const response = await fetch("/marquee.json");
      if (response.ok) {
        const data: MarqueeData = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to load marquee messages:", error);
      setMessages(["Welcome to the Pandas Learning Hub!"]);
    }
  };

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="marquee overflow-hidden whitespace-nowrap">
      <div className="marquee-content">
        {messages[currentIndex]}
      </div>
    </div>
  );
};
