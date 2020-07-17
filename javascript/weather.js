export default class Weather{
  constructor(date, temperature, windDirection, windSpeed, weatherDescription){
    this.date = date; //Date object
    this.temperature = temperature;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
    this.weatherDescription = weatherDescription; //weather code can be found here: http://opendata.smhi.se/apidocs/metfcst/parameters.html
  }
}