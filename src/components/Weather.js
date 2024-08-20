import './Weather.css';
import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const API_KEY = "9ab38d63642d3c5ec1bd248f70728a9a";

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }


  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert("wrong input");
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })

    }

    catch (error) {
      setWeatherData(false);
      console.error("Error in Fetching the Data");

    }
  }

  useEffect(() => {
    search("kolkata");

  }, [])



  return (

    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search' />
        <img className='search-img'
        onClick={() => search(inputRef.current.value)}
        src={search_icon} alt=" " />
      </div>

      <img className='weather-icon'
        src={weatherData.icon} alt=""
      />

      <p className='temperature'>{weatherData.temperature} °c</p>

      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>

        <div className='col'>
          <img src={humidity_icon} alt=" " />

          <p>{weatherData.humidity} %</p>
          <span>Humidity</span>

        </div>

        <div className='col'>
          <img src={wind_icon} alt=" " />

          <p>{weatherData.windSpeed} km/hr</p>
          <span>Wind Speed </span>

        </div>


      </div>

    </div>
  )
}

export default Weather
