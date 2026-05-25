export default function Forecast({ daily }) {
  if (!daily || daily.length === 0) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="forecast-section">
      <h3 className="section-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.map((day, index) => (
          <div key={index} className="forecast-card glass-panel">
            <p className="forecast-date">{index === 0 ? 'Today' : formatDate(day.date)}</p>
            <div className="forecast-condition">
              <span className="forecast-desc">{day.condition.text}</span>
            </div>
            <div className="forecast-temps">
              <span className="max-temp">{day.maxTemp}°</span>
              <span className="min-temp">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
