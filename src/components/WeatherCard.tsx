import { useEffect, useState } from "react";
import { WeatherData } from "../services/weatherService"

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="flex flex-col items-center p-4 border rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p>Temperatura: {Number(weather.main.temp).toFixed(0)}°C</p>
      <p>Descrição: {weather.weather[0].description}</p>
      <p>Umidade: {weather.main.humidity}%</p>
      <p>Vento: {Number(weather.wind.speed).toFixed(0)} km/h</p>
    </div>
  )
}