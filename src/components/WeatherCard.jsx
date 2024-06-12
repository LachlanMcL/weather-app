const WeatherCard = ({title, icon, statistics}) => {
    let key = 1;
    return (
      <div className="card text-center fs-5" style={{width: "18rem"}}>
            {icon[0]}
            <div className="card-header">{title}</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {statistics.map(statElement => <li key={key++} className="list-group-item">{statElement}</li>)}
              </ul>
            </div>
          </div>
    )
  }

export default WeatherCard