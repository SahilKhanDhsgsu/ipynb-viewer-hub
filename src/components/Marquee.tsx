
import React, { useState, useEffect } from 'react';

interface MarqueeData {
  messages: string[];
}

const Marquee: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadMarqueeData();
  }, []);

  const loadMarqueeData = async () => {
    try {
      // In a real implementation, this would fetch from marquee.json
      const mockData: MarqueeData = {
        messages: [
          "Welcome to the Pandas Learning Hub! 🐼",
          "Explore real-world data analysis with pandas",
          "Master GDP analysis, stock trends, and business insights",
          "Interactive Jupyter notebooks for hands-on learning",
          "From beginner to advanced - comprehensive pandas tutorials"
        ]
      };
      
      setMessages(mockData.messages);
    } catch (error) {
      console.error('Error loading marquee data:', error);
      // Fallback messages
      setMessages(['Welcome to Pandas Learning Hub!']);
    }
  };

  if (messages.length === 0) return null;

  return (
    <div 
      className="marquee-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={`marquee-content ${isPaused ? 'pause' : ''}`}
        style={{ 
          animationPlayState: isPaused ? 'paused' : 'running',
          animationDuration: `${messages.length * 4}s`
        }}
      >
        {/* Duplicate messages for seamless loop */}
        {[...messages, ...messages].map((message, index) => (
          <span key={index} className="marquee-item">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
