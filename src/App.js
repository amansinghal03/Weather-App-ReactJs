import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'antd'

let temprature;
let weather;

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [backimg, setBackimg] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        temprature = response.data.main.feels_like.toFixed()
        weather = response.data.weather[0].main
        console.log(response.data)
      })
      setLocation('')
    }
  }
  console.log("The is", temprature)

  const gifUrl = 'https://i.gifer.com/HIQa.gif';
  const front = 'https://i.gifer.com/WEMj.gif';
  const haze = 'https://i.gifer.com/7Jy7.gif';
  const cloud = 'https://i.gifer.com/Lx0q.gif';
  const clear = 'https://i.gifer.com/QINk.gif';
  const rain = 'https://i.gifer.com/TDK0.gif';
  const dust = 'https://i.gifer.com/67K.gif';

  const con = () => {
    var fTemp = temprature;
    var fToCel = (fTemp - 32) * 5 / 9;
    var number = fToCel;
    var result = parseInt(number);
    console.log('the message is ', result);
    return result;
  }

  const wea = () => {
    switch (weather) {
      case 'Clouds':
        return cloud;
      case 'Haze':
        return haze;
      case 'Clear':
        return clear;
      case 'Rain':
        return rain;
      case 'Dust':
        return dust;
      default:
        return gifUrl
    }
  }

  return (

    <div className="fixed bg-cover bg-center h-screen w-screen" style={{ backgroundImage: `url(${wea()})` }}>
      <div className="flex justify-center pt-5 text-center text-3xl">
        <input
          className='border border-black rounded-xl p-3'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="text-3xl text-white italic">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{con()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
};

export default App;
