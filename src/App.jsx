import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplaySwitch from './components/DisplaySwitch';

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState({})
  const [countrySelected, setCountrySelected] = useState(false);
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    request.then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setCountrySelected(false)
    setFilter(event.target.value)
  }

  let countriesToShow = []
  if (!countrySelected) {
    filter == '' 
    ? countriesToShow = countries
    : countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  } else {
    countriesToShow = []
    countriesToShow.push(countries.find(country => country.name.common.toLowerCase() === filter.toLowerCase()))
  }

  const handleShowButton = (countryName) => {
    setFilter(countryName)
    setCountrySelected(true)
  }

  const handleSetWeather = (lat, lng) => {
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
    request.then(response => {
      setWeatherData(response.data)
    })
  }

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-md-center'>
          <div className='col-md-auto'>
            <b>Find Countries:</b>
          </div> 
          <div className='col-md-auto'>
            <input value={filter} onChange={handleFilterChange}></input>
          </div>
        </div>
          <DisplaySwitch 
          countries={countries} 
          countriesToShow={countriesToShow} 
          handleShowButton={handleShowButton} 
          handleSetWeather={handleSetWeather}
          weatherData={weatherData}
          />
      </div>
    </div>
  )
}

export default App