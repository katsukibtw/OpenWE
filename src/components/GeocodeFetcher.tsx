import {Input, Box, Flex, ScaleFade, Spinner} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import fetchCities from '../api/fetchCities';
import {useRef} from 'react';
import {ImCross} from 'react-icons/im';
import {useCitiesStore} from '../store';

export default function GeocodeFetcher() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {isLoading, data, isError} = useQuery(
    ['geocode', inputRef.current?.value],
    () => fetchCities(inputRef.current?.value),
    {
      select: ({data}) => data,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
    }
  );

  const addCity = useCitiesStore(state => state.addCity);
  const changeCurrentCity = useCitiesStore(state => state.changeCurrentCity);
  const citiesCount = useCitiesStore(state => state.cities.length);

  const handleCityClick = (
    name: string,
    country: string,
    timezone: string,
    lat: number,
    lon: number
  ) => {
    addCity(name, country, timezone, lat, lon);
    changeCurrentCity(citiesCount);
  };

  return (
    <>
      <Input
        placeholder="Type the name of a city you want to find"
        w="auto"
        mb=".6rem"
        ref={inputRef}
      />
      <ScaleFade initialScale={0.8} in={!isLoading}>
        {data ? (
          isLoading ? (
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
              <Box>Getting data from server...</Box>
            </Flex>
          ) : isError ? (
            <Flex
              direction="row"
              mx="auto"
              alignItems="center"
              justifyContent="center"
              gap="1rem"
              mt="1rem"
            >
              <Box p="1rem" bg="red.100" borderRadius=".5rem" color="red.700">
                <ImCross />
              </Box>
              <Box>Error! Failed to fetch data from server</Box>
            </Flex>
          ) : data.results ? (
            data.results.map((el, index) => (
              <Box
                h="2.5rem"
                key={index}
                display="flex"
                flexDirection="row"
                gap=".25rem"
                _hover={{bg: 'gray.200'}}
                alignItems="center"
                p=".5rem"
                borderRadius=".5rem"
                transition=".2s ease"
                onClick={() =>
                  handleCityClick(
                    el.name,
                    el.country,
                    el.timezone,
                    el.latitude,
                    el.longitude
                  )
                }
              >
                {el.name} /
                <Box color="gray.500" fontWeight="700">
                  {el.country}
                </Box>
              </Box>
            ))
          ) : (
            <Box>Nothing to be seen so far.</Box>
          )
        ) : (
          <Box>Nothing to be seen so far.</Box>
        )}
      </ScaleFade>
    </>
  );
}
