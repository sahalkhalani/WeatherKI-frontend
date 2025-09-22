import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const WeatherAIChat = ({ locations }: { locations: string[] }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
  if (!question.trim()) return;
  
  setLoading(true);
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/ai/chat`, { // Changed endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, locations })
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.error);
    setResponse(data.response || 'Unable to get response');
  } catch (error) {
    setResponse('Sorry, I couldn\'t process your question right now.');
  }
  setLoading(false);
};

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Ask Weather AI</h3>
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., How's the weather compared to yesterday?"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyPress={(e) => e.key === 'Enter' && handleChat()}
        />
        
        <button
          onClick={handleChat}
          disabled={loading || !question.trim()}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Thinking...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Ask AI
            </>
          )}
        </button>
        
        {response && (
          <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
            <p className="text-white text-sm leading-relaxed">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherAIChat