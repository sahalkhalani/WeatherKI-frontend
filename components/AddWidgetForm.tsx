import React, { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';

interface AddWidgetFormProps {
  onAddWidget: (location: string) => void;
  isLoading?: boolean;
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({
  onAddWidget,
  isLoading = false
}) => {
  const [location, setLocation] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() && !isLoading) {
      onAddWidget(location.trim());
      setLocation('');
      setIsExpanded(false);
    }
  };

  const suggestedCities = [
    'Berlin',
    'Hamburg',
    'Munich',
    'Stuttgart',
    'Leipzig',
    'Cologne',
    'Paris',
    'London',
    'New York',
    'Delhi',
    'Sydney'
  ];

  if (!isExpanded) {
    return (
      <div 
        onClick={() => setIsExpanded(true)}
        className="bg-gradient-to-br from-blue-50 to-sky-50 border-2 border-dashed border-blue-300 rounded-2xl p-8 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-100 hover:to-sky-100 transition-all duration-300 cursor-pointer group animate-fade-in"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Add Weather Widget</h3>
            <p className="text-sm text-gray-600">Click to add a new city weather widget</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Add New Widget</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name (e.g., Berlin, Germany)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
            autoFocus
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!location.trim() || isLoading}
            className="flex-1 btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Widget
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setLocation('');
            }}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedCities.map((city) => (
            <button
              key={city}
              onClick={() => setLocation(city)}
              className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full transition-colors duration-200"
              disabled={isLoading}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddWidgetForm;