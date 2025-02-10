import { WeatherData } from "../services/weatherService"

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

  return (
    <div className="flex flex-col px-8 py-10 border-0 shadow-lg w-[450px] rounded-3xl bg-gradient-to-br from-white to-blue-50">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{weather.name}</h2>

      <div className="flex justify-center items-baseline gap-4 mb-8">
        <img src={iconUrl} className="bg-slate-400/50 rounded-full" alt={weather.weather[0].description} />
        <h2 className="text-7xl font-light text-center text-gray-900">{Number(weather.main.temp).toFixed(0)}°C</h2>
      </div>

      <div className="space-y-3 text-gray-600">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="font-medium">Descrição</span>
          <span className="capitalize">{weather.weather[0].description}</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="font-medium">Umidade</span>
          <span>{weather.main.humidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Vento</span>
          <span>{Number(weather.wind.speed).toFixed(0)} km/h</span>
        </div>
      </div>
    </div>
  )
}