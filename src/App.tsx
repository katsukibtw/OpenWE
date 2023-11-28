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
  useMediaQuery,
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

  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
    <Box p={isMobile ? 0 : 3} mx="auto" w={isMobile ? "calc(100vw)" : "89rem"}>
      <HStack
        spacing={4}
        p={isMobile ? 3 : 0}
        w={isMobile ? "calc(100vw)" : ""}
        overflowX="scroll"
      >
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
          <ModalBody
            minH={isMobile ? "calc(90vh)" : "10rem"}
            p={4}
            w={isMobile ? "90vw" : "26rem"}
          >
            <VStack spacing={0} align="left" w="auto">
              <GeocodeFetcher />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ScaleFade initialScale={0.8} in={!isLoading}>
        <Flex
          direction={isMobile ? "column" : "row"}
          gap="2rem"
          h="calc(90vh)"
          w={isMobile ? "100vw" : "calc(80vw)"}
          mx="auto"
          mt={isMobile ? "1rem" : "2rem"}
          p={isMobile ? 3 : 0}
          justifyContent={isMobile ? "start" : "center"}
        >
          {isLoading ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              gap="1rem"
              h="calc(90vh)"
              direction={isMobile ? "column" : "row"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Box fontSize={isMobile ? "1.5rem" : "2rem"} fontWeight="700">
                Getting data from server...
              </Box>
            </Flex>
          ) : isError ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              gap="1rem"
              h="calc(90vh)"
              direction={isMobile ? "column" : "row"}
              fontSize={isMobile ? "1.5rem" : "2rem"}
              fontWeight="700"
            >
              <Box p="1rem" bg="red.100" borderRadius=".5rem" color="red.700">
                <ImCross />
              </Box>
              <Box>Error! Failed to fetch data from server</Box>
            </Flex>
          ) : cities.length > 0 && data ? (
            <>
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
            </>
          ) : (
            <AddCity />
          )}
        </Flex>
      </ScaleFade>
    </Box>
  );
}

export default App;
