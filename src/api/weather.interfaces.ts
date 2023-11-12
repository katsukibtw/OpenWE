export interface CurrentDataUnits {
  wind_speed_10m: string;
  precipitation: string;
}

export interface CurrentData {
  time: string;
  precipitation: number;
  is_day: boolean;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  rain: number;
  showers: number;
  snowfall: number;
}

export interface HourlyDataUnits {
  time: string;
  temperature_2m: string;
  weather_code: string;
  is_day: boolean;
}

export interface HourlyData {
  time: string[];
  weather_code: number[];
  is_day: boolean[];
  temperature_2m: number[];
}

export interface DailyDataUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  wind_speed_10m_max: string;
  wind_direction_10m_dominant: string;
}

export interface DailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  wind_speed_10m_max: number[];
  wind_direction_10m_dominant: number[];
  precipitation_sum: number[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentDataUnits;
  current: CurrentData;
  hourly_units: HourlyDataUnits;
  hourly: HourlyData;
  daily_units: DailyDataUnits;
  daily: DailyData;
}
