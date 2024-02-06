import React, { useState } from 'react';
import styles from '../styles/Weather.module.css';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import wind from '../images/wind.png'
import humidity from '../images/humidity.png'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`);
      const data = await resp.json();

      if (data.error) {
        setIsError(true);
        setWeatherData(null);
      } else {
        const weatherDetails = {
          location_city: `${data.location.name} /`,
          location_country: `${data.location.country}`,
          temperature: `${data.current.temp_c} °C`,
          time: `${data.location.localtime}`,
          icon: `${data.current.condition.icon}`,
          wind_speed: `${data.current.wind_mph} km/h`,
          humidity: `${data.current.humidity} %`,
          feelslike_c: `${data.current.feelslike_c} °C`,
          uv_index: `${data.current.uv}`
        };
        setWeatherData(weatherDetails);
        setIsError(false);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData(city);
    setCity("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.weather}>
        <div className={styles.search}>
          <input
            className={styles.input}
            placeholder='Enter a city...'
            onChange={handleInputChange}
            value={city}
          />
          <button onClick={handleSearchClick} className={styles.searchBtn}><SearchIcon /></button>
          <Link to="/about">About</Link>
        </div>
        {isError && <div style={{ color: 'red' }}>Location not found!</div>}
        {weatherData && (
          <div>
            <div className={styles.name}>{weatherData.location_city} {weatherData.location_country}</div>
            <div className={styles.time}>{weatherData.time}</div>
            <div className={styles.weatherIcon}><img src={weatherData.icon} alt='' /></div>
            <div className={styles.temperature}>{weatherData.temperature}</div>
            <div className={styles.footer}>
              <div className={styles.details}>
                <div>
                  <img src={wind} />
                  {weatherData.wind_speed}
                </div>
                <div>
                  <img src={humidity} />
                  {weatherData.humidity}
                </div>
              </div>
              <div className={styles.details}>
                <div>{weatherData.feelslike_c}</div>
                <div>{weatherData.uv_index}</div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
