import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    // TODO: GET weather data from city name
    WeatherService.setCity(req.body.cityName);
    const allWeather = await WeatherService.buildWeateherData();
    // TODO: save city to search history
    HistoryService.addCity(req.body.cityName);
    return res.status(200).json(allWeather);

  } catch(err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const savedCities = await HistoryService.getCities();
    return res.json(savedCities);
  } catch(err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
