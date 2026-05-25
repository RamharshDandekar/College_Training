import { useState, useEffect, useCallback } from 'react';
import { fetchCoordinates, fetchWeather, getWeatherConditionFromCode } from '../services/weatherApi';

export function useWeather(defaultCity = "New York") {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async (cityName) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get coordinates for city
      const coords = await fetchCoordinates(cityName);
      if (!coords) {
        throw new Error(`Location "${cityName}" not found.`);
      }

      setLocation({ name: coords.name, country: coords.country });

      // 2. Fetch weather for those coordinates
      const data = await fetchWeather(coords.lat, coords.lon);
      
      // Parse data into a convenient format
      const current = data.current;
      const condition = getWeatherConditionFromCode(current.weather_code);

      setWeatherData({
        current: {
          temp: Math.round(current.temperature_2m),
          feelsLike: Math.round(current.apparent_temperature),
          humidity: current.relative_humidity_2m,
          windSpeed: current.wind_speed_10m,
          windDirection: current.wind_direction_10m,
          pressure: current.surface_pressure,
          isDay: current.is_day,
          conditionText: condition.text,
          conditionType: condition.type
        },
        daily: data.daily.time.map((time, index) => ({
          date: time,
          maxTemp: Math.round(data.daily.temperature_2m_max[index]),
          minTemp: Math.round(data.daily.temperature_2m_min[index]),
          uvIndex: data.daily.uv_index_max[index],
          sunrise: data.daily.sunrise[index],
          sunset: data.daily.sunset[index],
          condition: getWeatherConditionFromCode(data.daily.weather_code[index])
        }))
      });

    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load default city on initial mount
  useEffect(() => {
    loadWeather(defaultCity);
  }, [defaultCity, loadWeather]);

  return { weatherData, location, loading, error, searchCity: loadWeather };
}
