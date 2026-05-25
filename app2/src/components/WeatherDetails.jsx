import { Droplets, Wind, ThermometerSun, Compass } from 'lucide-react';

export default function WeatherDetails({ current }) {
  if (!current) return null;

  const details = [
    { icon: <Droplets size={24} />, label: "Humidity", value: `${current.humidity}%` },
    { icon: <Wind size={24} />, label: "Wind Speed", value: `${current.windSpeed} km/h` },
    { icon: <Compass size={24} />, label: "Wind Dir", value: `${current.windDirection}°` },
    { icon: <ThermometerSun size={24} />, label: "Pressure", value: `${current.pressure} hPa` },
  ];

  return (
    <div className="weather-details-grid">
      {details.map((detail, index) => (
        <div key={index} className="detail-item glass-panel">
          <div className="detail-icon">{detail.icon}</div>
          <div className="detail-info">
            <span className="detail-label">{detail.label}</span>
            <span className="detail-value">{detail.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
