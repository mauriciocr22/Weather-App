const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
  }
}

export const fetchCities = async (query: string): Promise<City[]> => {
  const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Erroo ao buscar cidades");
  }

  return response.json();
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar clima");
  }

  return response.json();
};