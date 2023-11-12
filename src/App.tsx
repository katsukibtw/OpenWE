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

  const { cities, currentCity, currentCityId, changeCurrentCity } =
    useCitiesStore((state) => state);

  const { isLoading, data, isError } = useQuery(
    ["weather", currentCity.lat, currentCity.lon, currentCity.timezone],
    () => fetchWeather(currentCity.lat, currentCity.lon, currentCity.timezone),
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
        <Tabs
          variant="unstyled"
          index={currentCityId}
          onChange={(index) => changeCurrentCity(index)}
        >
          {cities.length > 0 ? (
            <>
              <TabList>
                {cities.map((el, i) => (
                  <Tab key={i}>{el.name}</Tab>
                ))}
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
            </>
          ) : (
            <></>
          )}
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
      ) : cities.length > 0 ? (
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
              city={currentCity?.name}
              country={currentCity?.country}
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
