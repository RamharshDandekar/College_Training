import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import Forecast from './components/Forecast';
import './index.css';

function App() {
  const { weatherData, location, loading, error, searchCity } = useWeather("London");

  // Determine dynamic background class based on weather and time
  const getBackgroundClass = () => {
    if (loading || !weatherData) return 'bg-default';
    
    const { isDay, conditionType } = weatherData.current;
    
    if (!isDay) return 'bg-night';
    
    switch (conditionType) {
      case 'clear':
        return 'bg-sunny';
      case 'clouds':
      case 'fog':
        return 'bg-cloudy';
      case 'rain':
      case 'drizzle':
        return 'bg-rainy';
      case 'snow':
        return 'bg-snowy';
      case 'thunderstorm':
        return 'bg-stormy';
      default:
        return 'bg-default';
    }
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <div className="content-wrapper">
        <header className="app-header">
          <h1 className="app-title">Weather Scope</h1>
          <SearchBar onSearch={searchCity} />
        </header>

        <main className="main-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching weather data...</p>
            </div>
          ) : error ? (
            <div className="error-state glass-panel">
              <p>{error}</p>
            </div>
          ) : weatherData && location ? (
            <div className="weather-dashboard">
              <div className="current-weather-section">
                <WeatherCard current={weatherData.current} location={location} />
                <WeatherDetails current={weatherData.current} />
              </div>
              <div className="forecast-container">
                <Forecast daily={weatherData.daily} />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default App;
