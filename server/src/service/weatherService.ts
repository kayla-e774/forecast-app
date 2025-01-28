import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  iconDescription: string;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  
  private baseURL?: string;

  private apiKey?: string;

  lat?: number;

  lon?: number;

  private city = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
  }

  setCity(city: string): void {
    this.city = city;
  }

  // TODO: method to fetch weather based on city 
  fetchCityWeather = async () => {
    const weatherResponse = await fetch(
      `${this.baseURL}/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=imperial`
    );

    const weatherBody = await weatherResponse.json();
    const currentWeather = new Weather(
      weatherBody.name,
      dayjs().format('MM/DD/YYYY'), 
      weatherBody.main.temp, 
      weatherBody.wind.speed,
      weatherBody.main.humidity,
      weatherBody.weather[0].icon,
      weatherBody.weather[0].description);
    
    this.lon = weatherBody.coord.lon;
    this.lat = weatherBody.coord.lat;

    return currentWeather;
  }

  makeWeather = (weatherJson: any, index: number) => {
    const weather = new Weather(
      weatherJson.city.name,
      dayjs(weatherJson.list[index].dt * 1000).format('MM/DD/YYYY'),
      weatherJson.list[index].main.temp,
      weatherJson.list[index].wind.speed,
      weatherJson.list[index].main.humidity,
      weatherJson.list[index].weather[0].icon,
      weatherJson.list[index].weather[0].description
    )

    return weather;
  }

  // TODO: method to fetch 5 day forecast based on lon and lat 
  fetchForecast = async () => {
    const forecastWeather = new Array<Weather>;
    const forecastResponse = await fetch(
      `${this.baseURL}/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=imperial`
    );

    const forecastBody = await forecastResponse.json();

    const forecastItem8 = this.makeWeather(forecastBody, 7);
    forecastWeather.push(forecastItem8);

    const forecastItem16 = this.makeWeather(forecastBody, 15);
    forecastWeather.push(forecastItem16);

    const forecastItem24 = this.makeWeather(forecastBody, 23);
    forecastWeather.push(forecastItem24);

    const forecastItem32 = this.makeWeather(forecastBody, 31);
    forecastWeather.push(forecastItem32);

    const forecastItem40 = this.makeWeather(forecastBody, 39);
    forecastWeather.push(forecastItem40);

    return forecastWeather;
  }

  // TODO: method to build and return your array of weather objects
  buildWeateherData = async () => {
    const allWeather = new Array<Weather>;
    const todaysWeather = await this.fetchCityWeather();

    allWeather.push(todaysWeather);

    const forecast: Array<Weather> = await this.fetchForecast();
    const fullWeather = allWeather.concat(forecast);

    return fullWeather;
  }
}

export default new WeatherService();
