import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const WeatherTrivia = ({ locations }: { locations: string[] }) => {
  const [trivia, setTrivia] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

 useEffect(() => {
    if (locations.length > 0) {
      if (!locations.includes(selectedLocation)) {
        setSelectedLocation(locations[0]);
        setTrivia(''); 
      }
    } else {
      setSelectedLocation('');
      setTrivia('');
    }
  }, [locations, selectedLocation]);

const generateTrivia = async () => {
  if (!selectedLocation) return;
  
  setLoading(true);
  try {
    console.log(`Selected Location: ${selectedLocation}`)
    const result = await fetch('/api/weather/ai/trivia', { // Changed endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: selectedLocation })
    });
    const data = await result.json();
    if (!result.ok) throw new Error(data.error);
    setTrivia(data.trivia || 'No trivia available');
  } catch (error) {
    setTrivia('Unable to generate weather trivia right now.');
  }
  setLoading(false);
};

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-white" />
        <h3 className="text-lg font-semibold text-white">Weather Trivia</h3>
      </div>
      
      {locations.length === 0 ? (
        <p className="text-white/60 text-sm">Add weather widgets to get fun weather facts</p>
      ) : (
        <div className="space-y-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {locations.map(location => (
              <option key={location} value={location} className="bg-gray-800">
                {location}
              </option>
            ))}
          </select>
          
          <button
            onClick={generateTrivia}
            disabled={loading}
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            {loading ? 'Loading Facts...' : 'Get Fun Facts'}
          </button>
          
          {trivia && (
            <div className="p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
              <p className="text-white text-sm leading-relaxed">
                <span className="text-yellow-300">💡 Did you know?</span><br />
                {trivia}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherTrivia; 