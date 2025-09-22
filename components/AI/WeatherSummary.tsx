import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const WeatherSummary = ({ locations }: { locations: string[] }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

const generateSummary = async () => {
  if (locations.length === 0) return;
  
  setLoading(true);
  try {
    const result = await fetch('/api/weather/ai/summary', { // Changed endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locations })
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.error);
    setSummary(data.summary || 'Unable to generate summary');
  } catch (error) {
    console.log(error)
    setSummary('Unable to generate weather summary right now.');
  }
  setLoading(false);
};

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">AI Summary</h3>
        </div>
        <button
          onClick={generateSummary}
          disabled={loading || locations.length === 0}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
        >
          {loading ? 'Generating...' : 'Get Summary'}
        </button>
      </div>
      
      {locations.length === 0 ? (
        <p className="text-white/60 text-sm">Add some weather widgets to get AI summaries</p>
      ) : summary ? (
        <div className="p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg">
          <p className="text-white text-sm leading-relaxed">{summary}</p>
        </div>
      ) : (
        <p className="text-white/60 text-sm">Click "Get Summary" to generate an AI weather overview</p>
      )}
    </div>
  );
};

export default WeatherSummary;