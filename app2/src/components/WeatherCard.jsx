import { MapPin } from 'lucide-react';

export default function WeatherCard({ current, location }) {
  if (!current || !location) return null;

  return (
    <div className="weather-card main-card glass-panel">
      <div className="location-header">
        <MapPin size={24} className="location-icon" />
        <h2>{location.name}, {location.country}</h2>
      </div>
      
      <div className="weather-main-info">
        <div className="temperature-container">
          <span className="temp-value">{current.temp}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="condition-info">
          <p className="condition-text">{current.conditionText}</p>
          <p className="feels-like">Feels like {current.feelsLike}°C</p>
        </div>
      </div>
    </div>
  );
}
