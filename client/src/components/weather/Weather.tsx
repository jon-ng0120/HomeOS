import { useState, useEffect } from 'react';
import { roundTemperatures } from '../../utilities/utilities';
import classes from './Weather.module.scss';

type fetchWeatherProps = {
  lat: number;
  lon: number;
};

type weatherType = {
  city: string;
  weather: [{ description: string; icon: string; main: string }];
  temperature: string;
};

const Weather = () => {
  const [weather, setWeather] = useState<weatherType | null>();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchWeather = async ({ lat, lon }: fetchWeatherProps) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=825c62a98c0ddf6dc90d3b25d56c1adb`
      );
      const data = await response.json();
      setWeather({
        city: data.name,
        weather: data.weather,
        temperature: data.main.temp,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {weather && (
        <div className={classes.weather_container}>
          <p>{weather.city}</p>

          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>{weather.weather[0].main}</p>
          <p className={classes.temperature}>
            {roundTemperatures(parseInt(weather.temperature))} &deg;
          </p>
        </div>
      )}
    </>
  );
};

export default Weather;
