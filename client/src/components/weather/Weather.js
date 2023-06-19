import { useState, useEffect } from 'react';
import {
  roundTemperatures,
  capitalizeSentence,
} from '../../utilities/utilities';
import classes from './Weather.module.scss';

const Weather = () => {
  const [weather, setWeather] = useState();

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

  const fetchWeather = async ({ lat, lon }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=825c62a98c0ddf6dc90d3b25d56c1adb`
      );
      const data = await response.json();
      setWeather({
        city: data.name,
        country: data.sys.country,
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
          <p className={classes.city_info}>
            {weather.city}, {weather.country}
          </p>
          <div className={classes.weather_details}>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <div>
              <p className={classes.temperature}>
                {roundTemperatures(parseInt(weather.temperature))} &deg;C
              </p>
              <p className={classes.description}>
                {capitalizeSentence(weather.weather[0].description)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
