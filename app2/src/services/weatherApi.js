const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Fetch coordinates for a given city name
 * @param {string} cityName
 * @returns {Promise<{lat: number, lon: number, name: string, country: string} | null>}
 */
export async function fetchCoordinates(cityName) {
  try {
    const response = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        lat: result.latitude,
        lon: result.longitude,
        name: result.name,
        country: result.country
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Failed to find location. Please try again.");
  }
}

/**
 * Fetch weather data given latitude and longitude
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<any>}
 */
export async function fetchWeather(lat, lon) {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,wind_speed_10m_max",
      timezone: "auto"
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
}

/**
 * Helper to map WMO weather codes to human-readable text and general conditions
 */
export function getWeatherConditionFromCode(code) {
  const codeMap = {
    0: { text: "Clear sky", type: "clear" },
    1: { text: "Mainly clear", type: "clear" },
    2: { text: "Partly cloudy", type: "clouds" },
    3: { text: "Overcast", type: "clouds" },
    45: { text: "Fog", type: "fog" },
    48: { text: "Depositing rime fog", type: "fog" },
    51: { text: "Light drizzle", type: "drizzle" },
    53: { text: "Moderate drizzle", type: "drizzle" },
    55: { text: "Dense drizzle", type: "drizzle" },
    56: { text: "Light freezing drizzle", type: "drizzle" },
    57: { text: "Dense freezing drizzle", type: "drizzle" },
    61: { text: "Slight rain", type: "rain" },
    63: { text: "Moderate rain", type: "rain" },
    65: { text: "Heavy rain", type: "rain" },
    66: { text: "Light freezing rain", type: "rain" },
    67: { text: "Heavy freezing rain", type: "rain" },
    71: { text: "Slight snow fall", type: "snow" },
    73: { text: "Moderate snow fall", type: "snow" },
    75: { text: "Heavy snow fall", type: "snow" },
    77: { text: "Snow grains", type: "snow" },
    80: { text: "Slight rain showers", type: "rain" },
    81: { text: "Moderate rain showers", type: "rain" },
    82: { text: "Violent rain showers", type: "rain" },
    85: { text: "Slight snow showers", type: "snow" },
    86: { text: "Heavy snow showers", type: "snow" },
    95: { text: "Thunderstorm", type: "thunderstorm" },
    96: { text: "Thunderstorm with slight hail", type: "thunderstorm" },
    99: { text: "Thunderstorm with heavy hail", type: "thunderstorm" },
  };

  return codeMap[code] || { text: "Unknown", type: "unknown" };
}
