import React, { useEffect, useState } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Zap, 
  CloudDrizzle,
  Thermometer,
  Umbrella,
  CloudLightning,
  Snowflake,
  Rainbow
} from 'lucide-react';

interface WeatherIcon {
  id: string;
  Component: React.ComponentType<any>;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const WeatherDrawingBackground: React.FC = () => {
  const [icons, setIcons] = useState<WeatherIcon[]>([]);

  const weatherIcons = [
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
    Wind,
    Zap,
    CloudDrizzle,
    Thermometer,
    Umbrella,
    CloudLightning,
    Snowflake,
    Rainbow
  ];

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: WeatherIcon[] = [];
      const iconCount = 15; // Number of icons to display

      for (let i = 0; i < iconCount; i++) {
        const IconComponent = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
        
        newIcons.push({
          id: `icon-${i}`,
          Component: IconComponent,
          x: Math.random() * 90 + 5, // 5% to 95% of screen width
          y: Math.random() * 90 + 5, // 5% to 95% of screen height
          size: Math.random() * 32 + 24, // Size between 24px and 56px
          opacity: Math.random() * 0.3 + 0.1, // Opacity between 0.1 and 0.4
          animationDelay: Math.random() * 5 // Random delay up to 5 seconds
        });
      }

      setIcons(newIcons);
    };

    generateIcons();

    // Regenerate icons every 30 seconds for variety
    const interval = setInterval(generateIcons, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* CSS Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(5deg);
          }
          66% {
            transform: translateY(5px) rotate(-3deg);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: var(--max-opacity);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .weather-icon {
          position: absolute;
          pointer-events: none;
          color: white;
          animation: 
            float 8s ease-in-out infinite,
            fadeInOut 12s ease-in-out infinite,
            pulse 6s ease-in-out infinite;
        }

        .weather-icon:nth-child(odd) {
          animation-direction: reverse;
        }

        .weather-icon:nth-child(3n) {
          animation-duration: 10s, 15s, 8s;
        }

        .weather-icon:nth-child(4n) {
          animation-duration: 6s, 10s, 4s;
        }
      `}</style>

      {/* Background Container */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {icons.map((icon) => {
          const IconComponent = icon.Component;
          
          return (
            <div
              key={icon.id}
              className="weather-icon"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}%`,
                '--max-opacity': icon.opacity,
                animationDelay: `${icon.animationDelay}s, ${icon.animationDelay + 1}s, ${icon.animationDelay + 0.5}s`,
              } as React.CSSProperties & { '--max-opacity': number }}
            >
              <IconComponent 
                size={icon.size} 
                strokeWidth={1.5}
                opacity={icon.opacity}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeatherDrawingBackground;