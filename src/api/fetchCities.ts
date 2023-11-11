import axios from 'axios';
import { GeocodeResponse } from './geocode.interfaces';

export default async function fetchCities(cityName: string) {
		return await axios.get<GeocodeResponse>(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`);
}
