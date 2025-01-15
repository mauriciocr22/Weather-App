import { useState } from "react";
import SearchBar from "./components/SearchBar"
import { City, fetchWeather, WeatherData } from "./services/weatherService";

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

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
      {weather && (
        <div className="">
          <h2>{weather.name}</h2>
          <span className="">Temperatura: {weather.main.temp}ºC</span>
        </div>
      )}
    </div>
  )
}

export default App
