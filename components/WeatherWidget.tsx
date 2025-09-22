import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, MapPin, Droplets, Wind, AlertCircle } from 'lucide-react';
import { Widget, WeatherData, widgetApi } from '../utils/api';
import CustomAlert from './CustomAlert';

interface WeatherWidgetProps {
  widget: Widget;
  onDelete: (id: string) => void;
  onUpdate: (id: string, weatherData: WeatherData) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  widget,
  onDelete,
  onUpdate
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await widgetApi.getWeatherData(widget.location);
      onUpdate(widget._id, weatherData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!widget.weatherData) {
      fetchWeatherData();
    }
  }, []);

  const handleRefresh = () => {
    fetchWeatherData();
  };


  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteAlert(false);
    try {
      await widgetApi.deleteWidget(widget._id);
      onDelete(widget._id);
    } catch (err) {
      console.error('Failed to delete widget:', err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
  };

  return (
    <>
    <div className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {widget.weatherData?.cityName || widget.location}
          </h3>
          {widget.weatherData?.country && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {widget.weatherData.country}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
            title="Refresh weather data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete widget"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={fetchWeatherData}
                className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {widget.weatherData && !loading && !error && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">{widget.weatherData.icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {widget.weatherData.temperature}°C
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {widget.weatherData.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-xs text-gray-500">Humidity</div>
                <div className="text-sm font-medium">{widget.weatherData.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-xs text-gray-500">Wind</div>
                <div className="text-sm font-medium">{widget.weatherData.windSpeed} km/h</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center pt-2">
            Created: {new Date(widget.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
      <CustomAlert
      isOpen={showDeleteAlert}
      onConfirm={handleDeleteConfirm}
      onCancel={handleDeleteCancel}
    />
  </>
  );
};

export default WeatherWidget;