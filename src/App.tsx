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
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";
import "./App.css";
import getIcon from "./api/getIcon";
import getWeatherType from "./api/getWeatherType";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const city = "Penza";
  const forecastDemo = JSON.parse(
    '{"latitude":53.1875,"longitude":45.0,"generationtime_ms":0.09500980377197266,"utc_offset_seconds":10800,"timezone":"Europe/Moscow","timezone_abbreviation":"MSK","elevation":154.0,"current_units":{"time":"iso8601","interval":"seconds","is_day":"","temperature_2m":"°C","apparent_temperature":"°C","weather_code":"wmo code","wind_speed_10m":"km/h","wind_direction_10m":"°"},"current":{"time":"2023-11-08T17:45","interval":900,"is_day":0,"temperature_2m":7.8,"apparent_temperature":5.8,"weather_code":2,"wind_speed_10m":7.1,"wind_direction_10m":240},"hourly_units":{"time":"iso8601","is_day":"","temperature_2m":"°C","weather_code":"wmo code"},"hourly":{"time":["2023-11-08T00:00","2023-11-08T01:00","2023-11-08T02:00","2023-11-08T03:00","2023-11-08T04:00","2023-11-08T05:00","2023-11-08T06:00","2023-11-08T07:00","2023-11-08T08:00","2023-11-08T09:00","2023-11-08T10:00","2023-11-08T11:00","2023-11-08T12:00","2023-11-08T13:00","2023-11-08T14:00","2023-11-08T15:00","2023-11-08T16:00","2023-11-08T17:00","2023-11-08T18:00","2023-11-08T19:00","2023-11-08T20:00","2023-11-08T21:00","2023-11-08T22:00","2023-11-08T23:00","2023-11-09T00:00","2023-11-09T01:00","2023-11-09T02:00","2023-11-09T03:00","2023-11-09T04:00","2023-11-09T05:00","2023-11-09T06:00","2023-11-09T07:00","2023-11-09T08:00","2023-11-09T09:00","2023-11-09T10:00","2023-11-09T11:00","2023-11-09T12:00","2023-11-09T13:00","2023-11-09T14:00","2023-11-09T15:00","2023-11-09T16:00","2023-11-09T17:00","2023-11-09T18:00","2023-11-09T19:00","2023-11-09T20:00","2023-11-09T21:00","2023-11-09T22:00","2023-11-09T23:00","2023-11-10T00:00","2023-11-10T01:00","2023-11-10T02:00","2023-11-10T03:00","2023-11-10T04:00","2023-11-10T05:00","2023-11-10T06:00","2023-11-10T07:00","2023-11-10T08:00","2023-11-10T09:00","2023-11-10T10:00","2023-11-10T11:00","2023-11-10T12:00","2023-11-10T13:00","2023-11-10T14:00","2023-11-10T15:00","2023-11-10T16:00","2023-11-10T17:00","2023-11-10T18:00","2023-11-10T19:00","2023-11-10T20:00","2023-11-10T21:00","2023-11-10T22:00","2023-11-10T23:00","2023-11-11T00:00","2023-11-11T01:00","2023-11-11T02:00","2023-11-11T03:00","2023-11-11T04:00","2023-11-11T05:00","2023-11-11T06:00","2023-11-11T07:00","2023-11-11T08:00","2023-11-11T09:00","2023-11-11T10:00","2023-11-11T11:00","2023-11-11T12:00","2023-11-11T13:00","2023-11-11T14:00","2023-11-11T15:00","2023-11-11T16:00","2023-11-11T17:00","2023-11-11T18:00","2023-11-11T19:00","2023-11-11T20:00","2023-11-11T21:00","2023-11-11T22:00","2023-11-11T23:00","2023-11-12T00:00","2023-11-12T01:00","2023-11-12T02:00","2023-11-12T03:00","2023-11-12T04:00","2023-11-12T05:00","2023-11-12T06:00","2023-11-12T07:00","2023-11-12T08:00","2023-11-12T09:00","2023-11-12T10:00","2023-11-12T11:00","2023-11-12T12:00","2023-11-12T13:00","2023-11-12T14:00","2023-11-12T15:00","2023-11-12T16:00","2023-11-12T17:00","2023-11-12T18:00","2023-11-12T19:00","2023-11-12T20:00","2023-11-12T21:00","2023-11-12T22:00","2023-11-12T23:00","2023-11-13T00:00","2023-11-13T01:00","2023-11-13T02:00","2023-11-13T03:00","2023-11-13T04:00","2023-11-13T05:00","2023-11-13T06:00","2023-11-13T07:00","2023-11-13T08:00","2023-11-13T09:00","2023-11-13T10:00","2023-11-13T11:00","2023-11-13T12:00","2023-11-13T13:00","2023-11-13T14:00","2023-11-13T15:00","2023-11-13T16:00","2023-11-13T17:00","2023-11-13T18:00","2023-11-13T19:00","2023-11-13T20:00","2023-11-13T21:00","2023-11-13T22:00","2023-11-13T23:00","2023-11-14T00:00","2023-11-14T01:00","2023-11-14T02:00","2023-11-14T03:00","2023-11-14T04:00","2023-11-14T05:00","2023-11-14T06:00","2023-11-14T07:00","2023-11-14T08:00","2023-11-14T09:00","2023-11-14T10:00","2023-11-14T11:00","2023-11-14T12:00","2023-11-14T13:00","2023-11-14T14:00","2023-11-14T15:00","2023-11-14T16:00","2023-11-14T17:00","2023-11-14T18:00","2023-11-14T19:00","2023-11-14T20:00","2023-11-14T21:00","2023-11-14T22:00","2023-11-14T23:00"],"is_day":[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],"temperature_2m":[8.5,8.4,8.4,8.3,8.0,7.7,7.9,7.8,7.8,8.3,8.7,9.2,10.0,10.0,10.1,10.0,9.0,8.0,7.7,7.5,6.9,6.6,6.1,5.3,5.2,5.1,5.3,5.7,6.0,6.3,6.4,6.5,6.6,6.9,7.0,6.9,7.1,7.0,7.1,7.1,7.0,6.9,7.0,6.5,6.5,6.5,6.5,6.3,5.4,4.9,5.0,4.8,4.4,4.4,4.5,4.7,4.9,5.0,5.1,5.5,6.1,6.2,5.9,5.6,5.2,4.9,4.8,4.6,4.5,4.1,3.6,3.2,3.1,3.2,3.1,3.0,2.9,2.9,2.8,2.3,2.1,2.6,3.0,3.7,4.2,4.7,5.1,5.2,4.8,4.1,3.5,3.1,2.8,2.6,2.3,2.1,2.0,2.0,2.2,2.3,2.4,2.5,2.6,2.7,2.7,2.9,3.3,3.8,4.2,4.3,4.3,4.3,4.2,4.1,4.1,4.3,4.5,4.7,4.8,4.9,5.0,5.1,5.2,5.3,3.7,3.9,4.2,4.5,4.8,5.1,8.6,9.0,9.1,9.0,8.6,8.3,7.9,7.6,7.2,7.0,6.8,6.5,6.1,5.6,5.2,4.9,4.7,4.4,4.1,3.9,3.7,3.5,3.5,3.6,4.1,4.7,5.3,5.6,5.9,6.0,5.8,5.5,5.1,4.7,4.2,3.8,3.4,3.1],"weather_code":[3,3,2,3,2,3,2,3,3,3,3,3,2,2,1,2,2,2,3,1,2,3,3,45,45,45,3,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,3,61,61,61,61,61,3,3,61,61,61,61,61,61,3,3,3,3,3,3,3,2,3,3,3,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,61,61,61,61,61,61,61,61,61,61,61,61,61,61,61,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3]},"daily_units":{"time":"iso8601","weather_code":"wmo code","temperature_2m_max":"°C","temperature_2m_min":"°C"},"daily":{"time":["2023-11-08","2023-11-09","2023-11-10","2023-11-11","2023-11-12","2023-11-13","2023-11-14"],"weather_code":[45,61,61,3,61,61,3],"temperature_2m_max":[10.1,7.1,6.2,5.2,4.9,9.1,6.0],"temperature_2m_min":[5.3,5.1,3.2,2.1,2.0,3.7,3.1]}}',
  );

  return (
    <Box spacing={4} p={3} mx="auto" w="calc(87vw)">
      <HStack spacing={4}>
        <IconButton
          onClick={onOpen}
          aria-label="Add a city"
          icon={
            <IconContext.Provider value={{ className: "plus_icon" }}>
              <div>
                <AiOutlinePlus />
              </div>
            </IconContext.Provider>
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
            <VStack spacing={4} align="left" w="auto">
              <Input placeholder="fuck you" w="auto" />
              <Text>Nothing to be seen so far</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {forecastDemo ? (
        <Flex
          direction="row"
          gap="2rem"
          h="calc(90vh)"
          w="calc(80vw)"
          mx="auto"
          mt="2rem"
        >
          <Box
            w="calc(22.5vw)"
            bgGradient={forecastDemo.current.is_day ? "linear(to-tr, blue.600, blue.200)" : "linear(to-br, blue.700, blue.900)"}
            borderRadius=".75rem"
            h="max-content"
            p="2rem"
            color="white"
          >
            <Box as="p" fontSize="2rem">
              {city}
            </Box>
            <Box
              fontSize="7rem"
              fontWeight="700"
              display="flex"
              alignItems="center"
            >
              {Math.round(forecastDemo.current.temperature_2m)}°
              {getIcon(
                forecastDemo.current.weather_code,
                forecastDemo.current.is_day,
              )}
            </Box>
            <Box fontSize="1.25rem">
              Feels like {Math.round(forecastDemo.current.apparent_temperature)}
              °
            </Box>
            <Box fontSize="1.5rem">
              {getWeatherType(forecastDemo.current.weather_code)}
            </Box>
						<Box mt="2rem" fontSize="1.5rem">Wind speed - </Box>
            <Flex w="calc(19vw)" gap=".75rem" mt=".5rem" overflow="scroll">
              {forecastDemo.hourly.time.slice(0, 24).map((el, index) => (
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  w="auto"
                  fontSize="1.25rem"
                  key={index}
                >
                  {el.split("T")[1]}
                  <Box fontSize="3rem">
                    {getIcon(
                      forecastDemo.hourly.weather_code[index],
                      forecastDemo.hourly.is_day[index],
                    )}
                  </Box>
                  {Math.round(forecastDemo.hourly.temperature_2m[index])}°
                </Flex>
              ))}
            </Flex>
          </Box>
          <Box>this is where the daily forecast should be</Box>
        </Flex>
      ) : (
        <Box
          display="flex"
          h="calc(90vh)"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={2}>
            <IconContext.Provider value={{ className: "center_plus_icon" }}>
              <AiOutlinePlus />
            </IconContext.Provider>
            <Text>Add a city to see something here</Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default App;
