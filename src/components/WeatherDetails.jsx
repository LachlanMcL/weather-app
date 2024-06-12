import WeatherCard from "./WeatherCard"

const WeatherDetails = ({weatherData}) => {

    const getTime = (dt) => {
      const newDT = new Date(dt * 1000)
      return newDT.toLocaleString('en-AU', {timeZone: weatherData.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit'})
    }
  
    const getMoonCycle = (percent) => {
      if (percent > 0 &&  percent <= 0.25) return "First Quarter Moon"
      if (percent > 0.25 &&  percent <= 0.5) return "Full Moon"
      if (percent > 0.5 &&  percent <= 0.75) return "Last Quarter Moon"
      return "New Moon"
    }
  
    const getWindDirection = (degree) => { //return the direction name that is closest to the degree.
      let newDegree = 0
      if (checkDegree(degree, newDegree)) return "North"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "North East"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "East"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "South East"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "South"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "South West"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "West"
      newDegree += 45
      if (checkDegree(degree, newDegree)) return "North West"
      newDegree += 45
    }
  
    const checkDegree = (degree, newDegree) => {
      if (degree >= newDegree - 22.5 && degree < newDegree + 22.5) return true
      return false
    }
    
    return (
      <>
        <div className="row gy-5">
          <div className="col">
            <WeatherCard 
              title={"Temperature"} 
              icon={[<><img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} className="card-img-top"/></>]}
              statistics={[
              <><b>{Math.round(weatherData.current.temp)}</b> °C</>,
              <>Feels like: <b>{Math.round(weatherData.current.feels_like)}</b> °C</>,
              <><b>{weatherData.current.weather[0].description}</b></>
            ]}/>
          </div>
          <div className="col">
            <WeatherCard 
              title={"Time"} 
              icon={[
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-clock card-img-top" style={{height: "10vh"}} viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                </svg>
              ]}
              statistics={[
              <><b>{getTime(weatherData.current.dt)}</b></>,
              <>Sunrise: <b>{getTime(weatherData.current.sunrise)}</b></>,
              <>Sunset: <b>{getTime(weatherData.current.sunset)}</b></>,
              <>Moonrise: <b>{getTime(weatherData.daily[0].moonrise)}</b></>,
              <>Moonset: <b>{getTime(weatherData.daily[0].moonset)}</b></>,
              <>Moon Cycle: <b>{getMoonCycle(weatherData.daily[0].moon_phase)}</b></>
            ]}/>
          </div>
          <div className="col">
            <WeatherCard 
              title={"Atmosphere"} 
              icon={[
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moisture card-img-top" style={{height: "10vh"}} viewBox="0 0 16 16">
                  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
                </svg>
              ]}
              statistics={[
              <>Pressure: <b>{weatherData.current.pressure}hPa</b></>,
              <>Humidity: <b>{weatherData.current.humidity}%</b></>,
              <>Cloudiness: <b>{weatherData.current.clouds}%</b></>,
              <>UV: <b>{weatherData.current.uvi}</b></>,
              <>Visibility: <b>{weatherData.current.visibility}m</b></>,
            ]}/>
          </div>
          <div className="col">
            <WeatherCard 
              title={"Wind"} 
              icon={[
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-haze2 card-img-top" style={{height: "10vh"}} viewBox="0 0 16 16">
                  <path d="M8.5 3a4 4 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 12H4.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 3M0 7.5A.5.5 0 0 1 .5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-2 4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
                </svg>
              ]}
              statistics={[
              <>Speed: <b>{weatherData.current.wind_speed}m/s</b></>,
              <>Gust Speed: <b>{weatherData.current.wind_gust}m/s</b></>,
              <>Wind Direction: <b>{getWindDirection(weatherData.current.wind_deg)}</b></>,
            ]}/>
          </div>
          <div className="col">
            <WeatherCard 
              title={"Rain/Snow"} 
              icon={[
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-sleet card-img-top" style={{height: "10vh"}} viewBox="0 0 16 16">
                  <path d="M13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973M8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 1M2.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zM6.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm2.151 2.447a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223z"/>
                </svg>
              ]}
              statistics={[
              <>Precipitation: <b>{weatherData.daily[0].pop * 100}%</b></>,
              <>Total Rain: <b>{weatherData.daily[0].rain || 0}mm</b></>,
              <>Total Snow: <b>{weatherData.daily[0].snow || 0}mm</b></>,
            ]}/>
          </div>
        </div>
      </>
    )
  }

export default WeatherDetails