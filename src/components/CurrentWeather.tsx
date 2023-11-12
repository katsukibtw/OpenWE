import { Box, Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import { WiDirectionUp } from "react-icons/wi";
import { RxCross2 } from "react-icons/rx";
import getIcon from "../api/getIcon";
import getWeatherType from "../api/getWeatherType";
import formatDate from "../api/formatDate";
import {
  CurrentData,
  CurrentDataUnits,
  HourlyData,
} from "../api/weather.interfaces";
import { useCitiesStore } from "../store";

interface Props {
  city: string;
  country: string;
  current: CurrentData;
  current_units: CurrentDataUnits;
  hourly: HourlyData;
}

export default function CurrentWeather(props: Props) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const removeCity = useCitiesStore((state) => state.removeCity);
  const currentCityId = useCitiesStore((state) => state.currentCityId);
  const changeCurrentCity = useCitiesStore((state) => state.changeCurrentCity);

  return (
    <Box
      w={isMobile ? "calc(94vw)" : "calc(22.5vw)"}
      bgGradient={
        props.current.rain > 0
          ? "linear(to-br, gray.700, gray.500)"
          : props.current.showers > 0
          ? "linear(to-br, blue.900, blue.200)"
          : props.current.snowfall > 0
          ? "linear(to-tr, gray.600, gray.200)"
          : props.current.is_day
          ? "linear(to-tr, blue.600, blue.200)"
          : "linear(to-br, blue.700, blue.900)"
      }
      borderRadius=".75rem"
      h="max-content"
      p={isMobile ? "1.5rem" : "2rem"}
      color="white"
      boxShadow="dark-lg"
      pos="relative"
    >
      <IconButton
        aria-label="Remove city"
        pos="absolute"
        top={isMobile ? "1.5rem" : "2rem"}
        right={isMobile ? "1.5rem" : "2rem"}
        bg="transparent"
        color="white"
        fontSize={isMobile ? "1.5rem" : "1.75rem"}
        _hover={{ bg: "red.100", color: "red.600" }}
        icon={<RxCross2 />}
        onClick={() => {
          removeCity(currentCityId);
          changeCurrentCity(currentCityId - 1);
        }}
      />
      <Box as="p" fontSize={isMobile ? "1.6rem" : "2rem"}>
        {props.city}
        {" / "}
        {props.country}
      </Box>
      <Box as="p" fontSize={isMobile ? "1rem" : "1.25rem"}>
        {formatDate(props.current.time)}
      </Box>
      <Box
        fontSize={isMobile ? "5rem" : "7rem"}
        fontWeight="700"
        display="flex"
        alignItems="center"
      >
        {Math.round(props.current.temperature_2m)}°
        {getIcon(props.current.weather_code, props.current.is_day)}
      </Box>
      <Box fontSize={isMobile ? "1rem" : "1.25rem"}>
        Feels like {Math.round(props.current.apparent_temperature)}°
      </Box>
      <Box fontSize="1.5rem">{getWeatherType(props.current.weather_code)}</Box>
      <Box
        mt="2rem"
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        display="flex"
        flexDirection="row"
        gap=".25rem"
        alignItems="center"
      >
        Wind speed - {props.current.wind_speed_10m}
        <Box as="span" fontWeight="700" fontSize="1.25rem">
          {props.current_units.wind_speed_10m}
        </Box>
        <Box
          as="span"
          fontSize="2.5rem"
          transform={"rotate(" + props.current.wind_direction_10m + "deg)"}
        >
          <WiDirectionUp />
        </Box>
      </Box>
      <Box
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        display="flex"
        flexDirection="row"
        gap=".25rem"
        alignItems="center"
      >
        Precipitation - {props.current.precipitation}
        <Box as="span" fontWeight="700" fontSize="1.25rem">
          {props.current_units.precipitation}
        </Box>
      </Box>
      <Flex
        w={isMobile ? "calc(74vw)" : "calc(19vw)"}
        gap=".75rem"
        mt=".5rem"
        overflowX="scroll"
      >
        {props.hourly.time.slice(0, 24).map((el, index) => (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            w="auto"
            fontSize={isMobile ? "1rem" : "1.25rem"}
            key={index}
          >
            {el.split("T")[1]}
            <Box fontSize={isMobile ? "2rem" : "3rem"}>
              {getIcon(
                props.hourly.weather_code[index],
                props.hourly.is_day[index],
              )}
            </Box>
            {Math.round(props.hourly.temperature_2m[index])}°
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
