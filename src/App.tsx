import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { City, fetchWeather, WeatherData } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";


function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation não suportado");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const weatherData = await fetchWeather(position.coords.latitude, position.coords.longitude);

      setWeather(weatherData);
    })
  }, [])

  const handleCitySelect = async (city: City) => {
    try {
      const weatherData = await fetchWeather(city.lat, city.lon);
      setWeather(weatherData);
    } catch (error) {
      console.error("Erro ao buscar dados do clima", error);
    }
  }

  return (
    <div className="w-[900px] pt-6 mx-auto flex flex-col justify-center items-center">
      <SearchBar onCitySelect={handleCitySelect} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  )
}

export default App
