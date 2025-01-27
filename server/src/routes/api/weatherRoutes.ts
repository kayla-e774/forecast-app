import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  WeatherService.setCity(req.body.cityName);
  try {
    const allWeather = await WeatherService.buildWeateherData();
    return res.status(200).json(allWeather);
  } catch(error) {
    return res.status(400).send("Bad Request, invalid city.")
  }
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
