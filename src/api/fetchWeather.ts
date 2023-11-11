import axios from 'axios';
import { WeatherData } from "./weather.interfaces";

export default async function fetchWeather(lat: number, lon: number, timezone: string) {
  return await axios.get<WeatherData>(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=${timezone}`,
  );
}
