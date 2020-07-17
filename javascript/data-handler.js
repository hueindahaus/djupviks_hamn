import Weather from './weather.js'

export async function fetchData(){

  const response = await fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.1489/lat/57.3081/data.json');
  let json = await response.json();
  let timeSeries = json.timeSeries;
  console.dir(timeSeries);
  
  if(response.status == 200){
    let results = new Array(6);
    let now = new Date();
    let symbolMap = createSymbolMapObject();
    //lokala tider
    let offset0 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+ 1, 0); 
    let offset6 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 7, 0);
    let offset12 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 13, 0);
    let offset18 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 19, 0);   //overflow av timmar räknas in till nästa dag
    let offset24 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 25, 0); //overflow av timmar räknas in till nästa dag
    let offset30 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 31, 0);  //overflow av timmar räknas in till nästa dag

    
    for(let i = 0; i < timeSeries.length; i++){
      if(timeSeries[i].validTime === offset0.toISOString().replace(/\.[0-9]{3}/, '')){
        results[0] = createWeatherObject(offset0, timeSeries[i], symbolMap);
      } else if(timeSeries[i].validTime === offset6.toISOString().replace(/\.[0-9]{3}/, '')){
        results[1] = createWeatherObject(offset6, timeSeries[i], symbolMap);
      } else if(timeSeries[i].validTime === offset12.toISOString().replace(/\.[0-9]{3}/, '')){
        results[2] = createWeatherObject(offset12, timeSeries[i], symbolMap)
      } else if(timeSeries[i].validTime === offset18.toISOString().replace(/\.[0-9]{3}/, '')){
        results[3] = createWeatherObject(offset18, timeSeries[i], symbolMap);
      } else if(timeSeries[i].validTime === offset24.toISOString().replace(/\.[0-9]{3}/, '')){
        results[4] = createWeatherObject(offset24, timeSeries[i], symbolMap);
      } else if(timeSeries[i].validTime === offset30.toISOString().replace(/\.[0-9]{3}/, '')){
        results[5] = createWeatherObject(offset30, timeSeries[i], symbolMap);
      }
    }
    console.dir(results);
    return results;
  } else {
    return undefined;
  }
  
}

function createWeatherObject(date, forecast, symbolMap){
  let weather = new Weather(date, forecast.parameters[11].values[0], forecast.parameters[13].values[0], forecast.parameters[14].values[0], symbolMap.get(forecast.parameters[18].values[0]));
  console.dir(weather);
  return weather;
}

function createSymbolMapObject(){ 
  let symbolMap = new Map();
  //weather code can be found here: http://opendata.smhi.se/apidocs/metfcst/parameters.html
  symbolMap.set(1,"Klar himmel");
  symbolMap.set(2, "Nästan klar himmel");
  symbolMap.set(3, "Variabel molnighet");
  symbolMap.set(4, "Halvklar himmel");
  symbolMap.set(5, "Molnig himmel");
  symbolMap.set(6, "Mulen himmel");
  symbolMap.set(7, "dimmigt");
  symbolMap.set(8, "Lätt regnskur");
  symbolMap.set(9, "Måttlig regnskur");
  symbolMap.set(10, "Stor regnskur");
  symbolMap.set(11, "Åskväder");
  symbolMap.set(12,"Lätt snöblandad regnskur");
  symbolMap.set(13, "Måttlig snöblandad regnskur");
  symbolMap.set(14, "Kraftig snöblandad regnskur");
  symbolMap.set(15, "Lätt snöby");
  symbolMap.set(16, "Måttlig snöby");
  symbolMap.set(17, "Kraftig snöby");
  symbolMap.set(18, "Lätt regn");
  symbolMap.set(19, "Måttlig regn");
  symbolMap.set(20, "Kraftig regn");
  symbolMap.set(21, "Åska");
  symbolMap.set(22, "Lätt snöblandad regn");
  symbolMap.set(23, "Måttlig snöblandad regn");
  symbolMap.set(24, "Kraftig snöblandad regn");
  symbolMap.set(25, "Lätt snöfall");
  symbolMap.set(26, "Måttligt snöfall");
  symbolMap.set(27, "Kraftigt snöfall");

  return symbolMap;
}
