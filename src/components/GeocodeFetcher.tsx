import { Input, Box, Flex, ScaleFade, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import fetchCities from "../api/fetchCities";
import { useRef } from "react";
import { ImCross } from "react-icons/im";

export default function GeocodeFetcher() {
  // const geocodingDemo = JSON.parse(
  // '{"results":[{"id":2950159,"name":"Berlin","latitude":52.52437,"longitude":13.41053,"elevation":74.0,"feature_code":"PPLC","country_code":"DE","admin1_id":2950157,"admin3_id":6547383,"admin4_id":6547539,"timezone":"Europe/Berlin","population":3426354,"postcodes":["10967","13347"],"country_id":2921044,"country":"Germany","admin1":"Land Berlin","admin3":"Berlin, Stadt","admin4":"Berlin"},{"id":5083330,"name":"Berlin","latitude":44.46867,"longitude":-71.18508,"elevation":311.0,"feature_code":"PPL","country_code":"US","admin1_id":5090174,"admin2_id":5084973,"admin3_id":5083340,"timezone":"America/New_York","population":9367,"postcodes":["03570"],"country_id":6252001,"country":"United States","admin1":"New Hampshire","admin2":"Coos","admin3":"City of Berlin"},{"id":4500771,"name":"Berlin","latitude":39.79123,"longitude":-74.92905,"elevation":50.0,"feature_code":"PPL","country_code":"US","admin1_id":5101760,"admin2_id":4501019,"admin3_id":4500776,"timezone":"America/New_York","population":7590,"postcodes":["08009"],"country_id":6252001,"country":"United States","admin1":"New Jersey","admin2":"Camden","admin3":"Borough of Berlin"},{"id":5245497,"name":"Berlin","latitude":43.96804,"longitude":-88.94345,"elevation":246.0,"feature_code":"PPL","country_code":"US","admin1_id":5279468,"admin2_id":5255015,"admin3_id":5245510,"timezone":"America/Chicago","population":5420,"postcodes":["54923"],"country_id":6252001,"country":"United States","admin1":"Wisconsin","admin2":"Green Lake","admin3":"City of Berlin"},{"id":4348460,"name":"Berlin","latitude":38.32262,"longitude":-75.21769,"elevation":11.0,"feature_code":"PPL","country_code":"US","admin1_id":4361885,"admin2_id":4374180,"timezone":"America/New_York","population":4529,"postcodes":["21811"],"country_id":6252001,"country":"United States","admin1":"Maryland","admin2":"Worcester"},{"id":4930431,"name":"Berlin","latitude":42.3812,"longitude":-71.63701,"elevation":100.0,"feature_code":"PPL","country_code":"US","admin1_id":6254926,"admin2_id":4956199,"admin3_id":4930436,"timezone":"America/New_York","population":2422,"postcodes":["01503"],"country_id":6252001,"country":"United States","admin1":"Massachusetts","admin2":"Worcester","admin3":"Town of Berlin"},{"id":4556518,"name":"Berlin","latitude":39.92064,"longitude":-78.9578,"elevation":710.0,"feature_code":"PPL","country_code":"US","admin1_id":6254927,"admin2_id":5212857,"admin3_id":4556520,"timezone":"America/New_York","population":2019,"postcodes":["15530"],"country_id":6252001,"country":"United States","admin1":"Pennsylvania","admin2":"Somerset","admin3":"Borough of Berlin"},{"id":4557666,"name":"East Berlin","latitude":39.9376,"longitude":-76.97859,"elevation":131.0,"feature_code":"PPL","country_code":"US","admin1_id":6254927,"admin2_id":4556228,"admin3_id":4557667,"timezone":"America/New_York","population":1534,"postcodes":["17316"],"country_id":6252001,"country":"United States","admin1":"Pennsylvania","admin2":"Adams","admin3":"Borough of East Berlin"},{"id":5147132,"name":"Berlin","latitude":40.56117,"longitude":-81.7943,"elevation":391.0,"feature_code":"PPL","country_code":"US","admin1_id":5165418,"admin2_id":5157783,"admin3_id":5147154,"timezone":"America/New_York","population":898,"postcodes":["44610"],"country_id":6252001,"country":"United States","admin1":"Ohio","admin2":"Holmes","admin3":"Berlin Township"},{"id":1510159,"name":"Berlin","latitude":54.00603,"longitude":61.19308,"elevation":228.0,"feature_code":"PPL","country_code":"RU","admin1_id":1508290,"admin2_id":1489213,"timezone":"Asia/Yekaterinburg","population":613,"postcodes":["457130"],"country_id":2017370,"country":"Russia","admin1":"Chelyabinsk","admin2":"Troitskiy Rayon"}],"generationtime_ms":1.0839701}',
  // );
  const inputRef = useRef();
  const { isLoading, data, isError } = useQuery(
    ["geocode", inputRef.current?.value],
    () => fetchCities(inputRef.current?.value),
    {
      select: ({ data }) => data,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
    },
  );

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
                _hover={{ bg: "gray.200" }}
                alignItems="center"
                p=".5rem"
                borderRadius=".5rem"
                transition=".2s ease"
                onClick={() => console.log(el)}
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
