import {
  Box,
  Flex,
  AccordionPanel,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
} from "@chakra-ui/react";
import getIcon from "../api/getIcon";
import formatDate from "../api/formatDate";
import { WiDirectionUp } from "react-icons/wi";
import { DailyData, DailyDataUnits, HourlyData } from '../api/weather.interfaces';

interface Props {
		daily: DailyData;
		daily_units: DailyDataUnits;
		hourly: HourlyData;
}

export default function DailyForecast(props: Props) {
  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (_, index) => array.slice(index * chunkSize, (index + 1) * chunkSize),
    );
  }

  const chunkHourlyTime = chunkArray(props.hourly.time, 24);
  const chunkHourlyWeatherCode = chunkArray(
    props.hourly.weather_code,
    24,
  );
  const chunkHourlyIsDay = chunkArray(props.hourly.is_day, 24);
  const chunkHourlyTemp = chunkArray(props.hourly.temperature_2m, 24);

  return (
    <Box w="50vw">
      <Accordion defaultIndex={[0]} allowMultiple>
        {props.daily.time.map((el, index) =>
          index !== 0 ? (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight="700">
                    {formatDate(el)}
                  </Box>
                  <Flex as="span" mr=".5rem" fontSize="2rem">
                    {getIcon(
                      chunkHourlyWeatherCode[index][5],
                      chunkHourlyIsDay[index][5],
                    )}
                    {getIcon(
                      chunkHourlyWeatherCode[index][11],
                      chunkHourlyIsDay[index][11],
                    )}
                    {getIcon(
                      chunkHourlyWeatherCode[index][16],
                      chunkHourlyIsDay[index][16],
                    )}
                    {getIcon(
                      chunkHourlyWeatherCode[index][23],
                      chunkHourlyIsDay[index][23],
                    )}
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box
                  fontSize="2.25rem"
                  fontWeight="700"
                  display="flex"
                  alignItems="center"
                  gap=".5rem"
                  mb="1rem"
                >
                  {`${Math.round(
                    props.daily.temperature_2m_max[index],
                  )}° / ${Math.round(
                    props.daily.temperature_2m_min[index],
                  )}°`}
                  <Box fontSize="4rem">
                    {getIcon(props.daily.weather_code[index], true)}
                  </Box>
                </Box>
                <Flex fontSize="1.2rem" gap=".35rem" alignItems="center">
                  Maximum wind speed -{" "}
                  {props.daily.wind_speed_10m_max[index]}
                  <Box fontWeight="700">
                    {props.daily_units.wind_speed_10m_max}
                  </Box>
                  <Box
                    as="span"
                    fontSize="2rem"
                    transform={
                      "rotate(" +
                      props.daily.wind_direction_10m_dominant[index] +
                      "deg)"
                    }
                  >
                    <WiDirectionUp />
                  </Box>
                </Flex>
                <Flex
                  fontSize="1.2rem"
                  mb=".5rem"
                  gap=".35rem"
                  alignItems="center"
                >
                  Precipitation sum:{" "}
                  {props.daily.precipitation_sum[index]}{" "}
                  {props.daily_units.precipitation_sum}
                </Flex>
                <Box
                  flexDirection="row"
                  display="flex"
                  gap=".75rem"
                  overflowX="scroll"
                >
                  {chunkHourlyTime[index].map((ell, i) => (
                    <Flex
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      w="auto"
                      fontSize="1.25rem"
                      key={i}
                    >
                      {ell.split("T")[1]}
                      <Box fontSize="3rem">
                        {getIcon(
                          chunkHourlyWeatherCode[index][i],
                          chunkHourlyIsDay[index][i],
                        )}
                      </Box>
                      {Math.round(chunkHourlyTemp[index][i])}°
                    </Flex>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ) : (
            ""
          ),
        )}
      </Accordion>
    </Box>
  );
}
