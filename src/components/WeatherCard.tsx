import { WeatherData } from "../services/weatherService"
import { CiSun, CiCloud, CiCloudDrizzle } from "react-icons/ci";
import { IoRainyOutline, IoThunderstormOutline } from "react-icons/io5";
import { FaRegSnowflake } from "react-icons/fa";

interface WeatherCardProps {
  weather: WeatherData;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = (weatherMain: string) => {
    // switch (weatherMain) {
    //   case "céu limpo":
    //     return <CiSun size={50} />;
    //   case "nublado":
    //     return <CiCloud size={50} />;
    //   case "chuva":
    //     return <CiCloudDrizzle size={50} />;
    //   case "chuvisco":
    //     return <CiCloudDrizzle size={50} />;
    //   case "trovoada":
    //     return <IoThunderstormOutline size={50} />;
    //   case "neve":
    //     return <FaRegSnowflake size={50} />;
    //   default:
    //     return <IoRainyOutline size={50} />;
    // }
    if (weatherMain.includes("céu limpo")) {
      return <CiSun size={50} />;
    } else if (weatherMain.includes("nublado") || weatherMain.includes("nuvens")) {
      return <CiCloud size={50} />;
    } else if (weatherMain.includes("neve")) {
      return <FaRegSnowflake size={50} />;
    } else if (weatherMain.includes("chuva")) {
      return <IoRainyOutline size={50} />;
    } else if (weatherMain.includes("trovoadas")) {
      return <IoThunderstormOutline size={50} />;
    } else if (weatherMain.includes("garoa")) {
      return <CiCloudDrizzle size={50} />;
    } else {
      return <CiCloud size={50} />;
    }
  }



  return (
    <div className="flex flex-col px-8 py-8 border shadow-md w-[450px] rounded-3xl">
      <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
      <div className="flex justify-between">
        <h2 className="text-5xl font-semibold">{Number(weather.main.temp).toFixed(0)}°C</h2>
        {getWeatherIcon(weather.weather[0].description)}
      </div>
      <p>Descrição: {weather.weather[0].description}</p>
      <p>Umidade: {weather.main.humidity}%</p>
      <p>Vento: {Number(weather.wind.speed).toFixed(0)} km/h</p>
    </div>
  )
}