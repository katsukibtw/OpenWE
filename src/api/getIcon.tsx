import {
  WiDaySunny,
  WiDayCloudy,
  WiDaySunnyOvercast,
  WiDayFog,
  WiDaySleet,
  WiDayShowers,
  WiDayThunderstorm,
  WiDayRain,
  WiDaySnow,
  WiDaySnowWind,
  WiNightClear,
  WiNightCloudy,
  WiNightAltCloudy,
  WiNightFog,
  WiNightSleet,
  WiNightShowers,
  WiNightThunderstorm,
  WiNightRain,
  WiNightSnow,
  WiNightSnowWind,
  WiShowers,
  WiRain,
  WiSnow,
  WiSnowflakeCold,
  WiThunderstorm,
} from "react-icons/wi";

const getDayIcon = (weather_code: int) => {
  switch (weather_code) {
    case 0:
    case 1:
      return <WiDaySunny />;
    case 2:
      return <WiDayCloudy />;
    case 3:
      return <WiDaySunnyOvercast />;
    case 45:
    case 48:
      return <WiDayFog />;
    case 51:
    case 56:
    case 80:
      return <WiDaySleet />;
    case 53:
    case 57:
    case 81:
      return <WiDayShowers />;
    case 55:
    case 82:
      return <WiShowers />;
    case 61:
    case 66:
      return <WiDayShowers />;
    case 63:
      return <WiDayRain />;
    case 65:
    case 67:
      return <WiRain />;
    case 71:
    case 85:
      return <WiDaySnow />;
    case 73:
      return <WiDaySnowWind />;
    case 75:
    case 86:
      return <WiSnow />;
    case 77:
      return <WiSnowflakeCold />;
    case 95:
      return <WiThunderstorm />;
    case 96:
    case 99:
      return <WiDayThunderstorm />;
  }
};

const getNightIcon = (weather_code: int) => {
  switch (weather_code) {
    case 0:
    case 1:
      return <WiNightClear />;
    case 2:
      return <WiNightCloudy />;
    case 3:
      return <WiNightAltCloudy />;
    case 45:
    case 48:
      return <WiNightFog />;
    case 51:
    case 56:
    case 80:
      return <WiNightSleet />;
    case 53:
    case 57:
    case 81:
      return <WiNightShowers />;
    case 55:
    case 82:
      return <WiShowers />;
    case 61:
    case 66:
      return <WiNightShowers />;
    case 63:
      return <WiNightRain />;
    case 65:
    case 67:
      return <WiRain />;
    case 71:
    case 85:
      return <WiNightSnow />;
    case 73:
      return <WiNightSnowWind />;
    case 75:
    case 86:
      return <WiSnow />;
    case 77:
      return <WiSnowflakeCold />;
    case 95:
      return <WiThunderstorm />;
    case 96:
    case 99:
      return <WiNightThunderstorm />;
  }
};

const getIcon = (weather_code: int, isDay: boolean) => {
  return isDay ? getDayIcon(weather_code) : getNightIcon(weather_code);
};

export default getIcon;
