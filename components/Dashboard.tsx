import React, { useState, useEffect } from 'react';
import { Cloud, Sun, AlertCircle, Sparkles } from 'lucide-react';
import { Widget, WeatherData, widgetApi } from '../utils/api';
import WeatherWidget from './WeatherWidget';
import AddWidgetForm from './AddWidgetForm';
import WeatherAIChat from './AI/WeatherAIChat'
import WeatherSummary from './AI/WeatherSummary'
import LocationSuggestions from './AI/LocationSuggestions'
import WeatherDrawingBackground from './WeatherDrawingBackground'
import WeatherTrivia from './AI/WeatherTrivia'

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isAddingWidget, setIsAddingWidget] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAIFeatures, setShowAIFeatures] = useState(false);

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    try {
      setLoading(true);
      const data = await widgetApi.getWidgets();
      setWidgets(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load widgets');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWidget = async (location: string) => {
    setIsAddingWidget(true);
    setError(null);

    try {
      // Check if widget for this location already exists
      const existingWidget = widgets.find(
        w => w.location.toLowerCase() === location.toLowerCase()
      );
      
      if (existingWidget) {
        setError(`Widget for "${location}" already exists`);
        setIsAddingWidget(false);
        return;
      }

      console.log('Creating widget for location:', location);
      const newWidget = await widgetApi.createWidget({ location });
      setWidgets(prev => [...prev, newWidget]);
    } catch (err: any) {
      console.error('Error creating widget:', err);
      setError(err.response?.data?.message || 'Failed to create widget');
    } finally {
      console.log('Finished adding widget');
      setIsAddingWidget(false);
    }
  };

  const handleDeleteWidget = (id: string) => {
    setWidgets(prev => prev.filter(widget => widget._id !== id));
  };

  const handleUpdateWidget = (id: string, weatherData: WeatherData) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget._id === id ? { ...widget, weatherData } : widget
      )
    );
  };

  // Get locations for AI features
  const locations = widgets.map(widget => widget.location);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <WeatherDrawingBackground />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">WeatherKI</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
            Create and manage weather widgets for cities around the world. 
            Stay updated with real-time weather information.
          </p>
          
          {/* AI Features Toggle */}
          <button
            onClick={() => setShowAIFeatures(!showAIFeatures)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            {showAIFeatures ? 'Hide AI Features' : 'Show AI Features'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-red-800 font-medium mb-1">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Features Section */}
        {showAIFeatures && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Weather Insights</h2>
              <p className="text-blue-100">Get smart weather analysis and personalized recommendations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <WeatherAIChat locations={locations} />
              <WeatherSummary locations={locations} />
              <LocationSuggestions currentLocations={locations} />
              <WeatherTrivia locations={locations} />
            </div>
          </div>
        )}

        {/* Widgets Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add Widget Form */}
            <AddWidgetForm 
              onAddWidget={handleAddWidget}
              isLoading={isAddingWidget}
            />

            {/* Weather Widgets */}
            {widgets.map((widget) => (
              <WeatherWidget
                key={widget._id}
                widget={widget}
                onDelete={handleDeleteWidget}
                onUpdate={handleUpdateWidget}
              />
            ))}
          </div>

          {/* Empty State */}
          {widgets.length === 0 && !isAddingWidget && (
            <div className="text-center mt-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-white/70" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No widgets yet</h3>
              <p className="text-blue-100">
                Add your first weather widget to get started
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-blue-200 text-sm">
            Developed by{' '}
            <a 
              href="https://www.linkedin.com/in/sahal-khalani/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors duration-200 font-medium underline decoration-blue-300/50 hover:decoration-blue-300"
            >
              Sahal Khalani
            </a>
            {' '}| © 2025 WeatherKI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;