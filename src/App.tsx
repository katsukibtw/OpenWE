import {
  IconButton,
  HStack,
  VStack,
  Box,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Spinner,
  ScaleFade,
} from "@chakra-ui/react";
import "./App.css";
import AddCity from "./components/AddCity";
import { AiOutlinePlus } from "react-icons/ai";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import GeocodeFetcher from "./components/GeocodeFetcher";
import { useQuery } from "react-query";
import fetchWeather from "./api/fetchWeather";
import { ImCross } from "react-icons/im";
import { useCitiesStore } from "./store";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const forecastDemo = JSON.parse(
  // '{"latitude":53.1875,"longitude":45.0,"generationtime_ms":0.16200542449951172,"utc_offset_seconds":10800,"timezone":"Europe/Moscow","timezone_abbreviation":"MSK","elevation":154.0,"current_units":{"time":"iso8601","interval":"seconds","temperature_2m":"°C","apparent_temperature":"°C","is_day":"","precipitation":"mm","rain":"mm","showers":"mm","snowfall":"cm","weather_code":"wmo code","wind_speed_10m":"km/h","wind_direction_10m":"°"},"current":{"time":"2023-11-11T14:15","interval":900,"temperature_2m":3.5,"apparent_temperature":0.9,"is_day":1,"precipitation":0.00,"rain":0.00,"showers":0.00,"snowfall":0.00,"weather_code":3,"wind_speed_10m":6.2,"wind_direction_10m":216},"hourly_units":{"time":"iso8601","temperature_2m":"°C","weather_code":"wmo code","is_day":""},"hourly":{"time":["2023-11-11T00:00","2023-11-11T01:00","2023-11-11T02:00","2023-11-11T03:00","2023-11-11T04:00","2023-11-11T05:00","2023-11-11T06:00","2023-11-11T07:00","2023-11-11T08:00","2023-11-11T09:00","2023-11-11T10:00","2023-11-11T11:00","2023-11-11T12:00","2023-11-11T13:00","2023-11-11T14:00","2023-11-11T15:00","2023-11-11T16:00","2023-11-11T17:00","2023-11-11T18:00","2023-11-11T19:00","2023-11-11T20:00","2023-11-11T21:00","2023-11-11T22:00","2023-11-11T23:00","2023-11-12T00:00","2023-11-12T01:00","2023-11-12T02:00","2023-11-12T03:00","2023-11-12T04:00","2023-11-12T05:00","2023-11-12T06:00","2023-11-12T07:00","2023-11-12T08:00","2023-11-12T09:00","2023-11-12T10:00","2023-11-12T11:00","2023-11-12T12:00","2023-11-12T13:00","2023-11-12T14:00","2023-11-12T15:00","2023-11-12T16:00","2023-11-12T17:00","2023-11-12T18:00","2023-11-12T19:00","2023-11-12T20:00","2023-11-12T21:00","2023-11-12T22:00","2023-11-12T23:00","2023-11-13T00:00","2023-11-13T01:00","2023-11-13T02:00","2023-11-13T03:00","2023-11-13T04:00","2023-11-13T05:00","2023-11-13T06:00","2023-11-13T07:00","2023-11-13T08:00","2023-11-13T09:00","2023-11-13T10:00","2023-11-13T11:00","2023-11-13T12:00","2023-11-13T13:00","2023-11-13T14:00","2023-11-13T15:00","2023-11-13T16:00","2023-11-13T17:00","2023-11-13T18:00","2023-11-13T19:00","2023-11-13T20:00","2023-11-13T21:00","2023-11-13T22:00","2023-11-13T23:00","2023-11-14T00:00","2023-11-14T01:00","2023-11-14T02:00","2023-11-14T03:00","2023-11-14T04:00","2023-11-14T05:00","2023-11-14T06:00","2023-11-14T07:00","2023-11-14T08:00","2023-11-14T09:00","2023-11-14T10:00","2023-11-14T11:00","2023-11-14T12:00","2023-11-14T13:00","2023-11-14T14:00","2023-11-14T15:00","2023-11-14T16:00","2023-11-14T17:00","2023-11-14T18:00","2023-11-14T19:00","2023-11-14T20:00","2023-11-14T21:00","2023-11-14T22:00","2023-11-14T23:00","2023-11-15T00:00","2023-11-15T01:00","2023-11-15T02:00","2023-11-15T03:00","2023-11-15T04:00","2023-11-15T05:00","2023-11-15T06:00","2023-11-15T07:00","2023-11-15T08:00","2023-11-15T09:00","2023-11-15T10:00","2023-11-15T11:00","2023-11-15T12:00","2023-11-15T13:00","2023-11-15T14:00","2023-11-15T15:00","2023-11-15T16:00","2023-11-15T17:00","2023-11-15T18:00","2023-11-15T19:00","2023-11-15T20:00","2023-11-15T21:00","2023-11-15T22:00","2023-11-15T23:00","2023-11-16T00:00","2023-11-16T01:00","2023-11-16T02:00","2023-11-16T03:00","2023-11-16T04:00","2023-11-16T05:00","2023-11-16T06:00","2023-11-16T07:00","2023-11-16T08:00","2023-11-16T09:00","2023-11-16T10:00","2023-11-16T11:00","2023-11-16T12:00","2023-11-16T13:00","2023-11-16T14:00","2023-11-16T15:00","2023-11-16T16:00","2023-11-16T17:00","2023-11-16T18:00","2023-11-16T19:00","2023-11-16T20:00","2023-11-16T21:00","2023-11-16T22:00","2023-11-16T23:00","2023-11-17T00:00","2023-11-17T01:00","2023-11-17T02:00","2023-11-17T03:00","2023-11-17T04:00","2023-11-17T05:00","2023-11-17T06:00","2023-11-17T07:00","2023-11-17T08:00","2023-11-17T09:00","2023-11-17T10:00","2023-11-17T11:00","2023-11-17T12:00","2023-11-17T13:00","2023-11-17T14:00","2023-11-17T15:00","2023-11-17T16:00","2023-11-17T17:00","2023-11-17T18:00","2023-11-17T19:00","2023-11-17T20:00","2023-11-17T21:00","2023-11-17T22:00","2023-11-17T23:00"],"temperature_2m":[3.8,3.4,2.9,2.3,1.8,1.2,0.5,0.3,0.3,1.1,1.0,1.5,2.3,2.7,3.4,3.8,3.6,3.1,2.7,2.4,2.3,1.9,1.5,1.5,1.7,1.7,1.9,2.1,2.4,2.7,2.8,2.9,3.3,3.5,3.6,3.9,4.0,4.3,4.3,4.5,4.7,5.1,5.3,5.4,5.6,5.7,6.1,6.7,7.0,6.9,7.2,7.8,8.3,8.4,8.7,8.8,8.4,7.9,7.8,7.8,7.8,8.0,7.8,7.8,7.3,7.0,6.8,6.5,6.4,6.1,5.9,5.8,5.6,5.3,4.9,4.8,4.5,4.3,4.1,3.8,4.0,4.4,4.9,5.3,5.6,5.9,5.6,5.5,5.0,4.3,3.7,3.1,2.6,2.1,1.8,1.5,1.4,1.3,1.4,1.4,1.5,1.5,1.6,1.7,1.8,2.1,2.8,3.7,4.3,4.7,4.9,4.9,4.6,4.2,3.8,3.6,3.5,3.4,3.2,3.0,2.9,2.8,2.7,2.6,2.6,2.5,2.4,2.3,2.2,2.2,2.3,2.9,3.1,2.8,2.1,1.6,1.2,0.8,0.5,0.2,-0.1,-0.3,-0.5,-0.5,-0.7,-0.9,-1.1,-1.4,-1.5,-1.7,-1.8,-2.0,-2.1,-2.1,-2.1,-1.9,-1.8,-1.8,-1.9,-2.0,-2.1,-2.2,-2.4,-2.5,-2.7,-3.0,-3.3,-3.6],"weather_code":[2,1,1,1,1,2,45,45,45,3,45,45,45,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,61,61,61,61,61,61,3,61,61,61,3,53,3,3,3,3,3,2,3,3,3,61,61,61,61,2,3,3,3,3,3,61,3,3,3,61,3,3,3,3,3,3,2,2,3,3,3,2,2,3,3,2,2,1,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,61,61,61,61,61,61,51,51,51,3,3,3,3,3,3,51,51,51,3,3,3,61,61,61,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1],"is_day":[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0]},"daily_units":{"time":"iso8601","weather_code":"wmo code","temperature_2m_max":"°C","temperature_2m_min":"°C","precipitation_sum":"mm","wind_speed_10m_max":"km/h","wind_direction_10m_dominant":"°"},"daily":{"time":["2023-11-11","2023-11-12","2023-11-13","2023-11-14","2023-11-15","2023-11-16","2023-11-17"],"weather_code":[45,61,61,3,61,61,3],"temperature_2m_max":[3.8,6.7,8.8,5.9,4.9,3.1,-0.7],"temperature_2m_min":[0.3,1.7,5.8,1.5,1.3,-0.5,-3.6],"precipitation_sum":[0.00,10.50,1.70,0.10,2.10,0.30,0.00],"wind_speed_10m_max":[7.8,21.7,21.0,15.8,5.8,14.0,13.2],"wind_direction_10m_dominant":[226,151,199,221,142,17,13]}}',
  // );

  const city = "Penza";
  const lat = 53.2007;
  const lon = 45.0046;
  const timezone = "Europe/Moscow";

  const citiesStore = useCitiesStore((state) => state);

  const { isLoading, data, isError } = useQuery(
    ["weather", lat, lon, timezone],
    () => fetchWeather(lat, lon, timezone),
    {
      select: ({ data }) => data,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Box p={3} mx="auto" w="calc(89rem)">
      <HStack spacing={4}>
        <IconButton
          onClick={onOpen}
          aria-label="Add a city"
          icon={
            <Box fontSize="1.5rem">
              <AiOutlinePlus />
            </Box>
          }
        />
        <Tabs variant="unstyled">
          <TabList>
            <Tab>123</Tab>
            <Tab>123</Tab>
            <Tab>123</Tab>
            <Tab>123</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
        </Tabs>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton mt={3} />
          <ModalBody minH="10rem" w="26rem" p={4}>
            <VStack spacing={0} align="left" w="auto">
              <GeocodeFetcher />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isLoading ? (
        <ScaleFade initialScale={0.8} in={!isLoading}>
          <Flex
            direction="row"
            h="calc(90vh)"
            w="calc(80vw)"
            mx="auto"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Box fontSize="2rem" fontWeight="700">
              Getting data from server...
            </Box>
          </Flex>
        </ScaleFade>
      ) : isError ? (
        <ScaleFade initialScale={0.8} in={!isLoading}>
          <Flex
            direction="row"
            h="calc(90vh)"
            w="calc(80vw)"
            mx="auto"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
            fontSize="2rem"
            fontWeight="700"
          >
            <Box p="1rem" bg="red.100" borderRadius=".5rem" color="red.700">
              <ImCross />
            </Box>
            <Box>Error! Failed to fetch data from server</Box>
          </Flex>
        </ScaleFade>
      ) : data ? (
        <ScaleFade initialScale={0.8} in={!isLoading}>
          <Flex
            direction="row"
            gap="2rem"
            h="calc(90vh)"
            w="calc(80vw)"
            mx="auto"
            mt="2rem"
          >
            <CurrentWeather
              city={city}
              current={data.current}
              current_units={data.current_units}
              hourly={data.hourly}
            />
            <DailyForecast
              daily={data.daily}
              daily_units={data.daily_units}
              hourly={data.hourly}
            />
          </Flex>
        </ScaleFade>
      ) : (
        <AddCity />
      )}
    </Box>
  );
}

export default App;
