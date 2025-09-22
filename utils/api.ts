import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_URL 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface Widget {
  _id: string;
  location: string;
  createdAt: string;
  weatherData?: WeatherData;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
  cityName: string;
  country: string;
}

export interface CreateWidgetRequest {
  location: string;
}

// Widget API calls
export const widgetApi = {
  // Get all widgets
  getWidgets: async (): Promise<Widget[]> => {
    const response = await api.get('/widgets');
    return response.data;
  },

  // Create new widget
  createWidget: async (data: CreateWidgetRequest): Promise<Widget> => {
    const response = await api.post('/widgets', data);
    return response.data;
  },

  // Delete widget
  deleteWidget: async (id: string): Promise<void> => {
    await api.delete(`/widgets/${id}`);
  },

  // Get weather data for widget
  getWeatherData: async (location: string): Promise<WeatherData> => {
    const response = await api.get(`/weather/${encodeURIComponent(location)}`);
    return response.data;
  },
};

export default api;