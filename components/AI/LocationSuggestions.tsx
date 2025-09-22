import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationSuggestions = ({ currentLocations }: { currentLocations: string[] }) => {
  const [suggestions, setSuggestions] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);

const getSuggestions = async () => {
  if (!interests.trim()) return;
  
  setLoading(true);
  try {
    const result = await fetch('/api/weather/ai/suggestions', { // Changed endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentLocations, interests })
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.error);
    setSuggestions(data.suggestions || 'No suggestions available');
  } catch (error) {
    setSuggestions('Unable to get location suggestions right now.');
  }
  setLoading(false);
};

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Smart Suggestions</h3>
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g., skiing, beaches, photography"
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        
        <button
          onClick={getSuggestions}
          disabled={loading || !interests.trim()}
          className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
        >
          {loading ? 'Finding Places...' : 'Get Suggestions'}
        </button>
        
        {suggestions && (
          <div className="p-4 bg-indigo-500/20 border border-indigo-400/30 rounded-lg max-h-48 overflow-y-auto">
            <pre className="text-white text-sm whitespace-pre-wrap leading-relaxed">{suggestions}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSuggestions;