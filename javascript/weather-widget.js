import {fetchData} from "./data-handler.js";

const wrapper = document.querySelector("#smhi-widget");


fetchData().then((results) => {
  //When the data has been retrieved from api
  if(results !== undefined){
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    //let icon = document.createElement("th");
    let date = document.createElement("th");
    let temperature = document.createElement("th");
    let wind = document.createElement("th");
    let description = document.createElement("th");

    //icon.innerHTML = "";
    date.innerHTML = "Tid";
    temperature.innerHTML = "Temperatur";
    wind.innerHTML = "Vind";
    description.innerHTML = "Väder";

    table.appendChild(thead);
    table.appendChild(tbody);
    //tr.appendChild(icon);
    tr.appendChild(date);
    tr.appendChild(temperature);
    tr.appendChild(wind);
    tr.appendChild(description);
    thead.appendChild(tr);
    wrapper.appendChild(table);

    table.classList.add("weatherTable");
    tr.id = "table-head";

    for(let i = 0; i < results.length; i++){
      let row = document.createElement("tr");
      let weatherDate = document.createElement("td");
      let weatherTemperature = document.createElement("td");
      let weatherWind = document.createElement("td");
      let weatherDescription = document.createElement("td");

      weatherDate.innerHTML = results[i].date.toLocaleString();
      weatherTemperature.innerHTML = results[i].temperature + " °C";
      weatherWind.innerHTML = results[i].windSpeed + " m/s";
      weatherDescription.innerHTML = results[i].weatherDescription;
      
      row.appendChild(weatherDate);
      row.appendChild(weatherTemperature);
      row.appendChild(weatherWind);
      row.appendChild(weatherDescription);
      tbody.appendChild(row);

    
    }
  }
});


