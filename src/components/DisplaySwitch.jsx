import CenterMiddleLayout from "./CenterMiddleLayout"
import CountryDetails from "./CountryDetails"

const DisplaySwitch = ({countries, countriesToShow, handleShowButton, handleSetWeather, weatherData}) => {
    if (countries.length == 0) return <CenterMiddleLayout text={'loading countries'} />
    if (countriesToShow.length == 1) return <CountryDetails country={countriesToShow[0]} handleSetWeather={handleSetWeather} weatherData={weatherData}/>
    if (countriesToShow.length <= 10) {
      return (
        countriesToShow.map(country =>
          <div className="row mt-3" key={country.name.official}>
            <span className="col-md-2 col-6">{country.name.common}</span> 
            <button className="btn btn-info col-md-3 col-6" onClick={() => handleShowButton(country.name.common)}>show</button>
          </div>
        )
      )
    }
    return <CenterMiddleLayout text={'Too many matches, specify another filter'} /> //when map matches are > 10
  }

  export default DisplaySwitch