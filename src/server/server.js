import "regenerator-runtime/runtime.js";

const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//path for static directory in express.static is always relative to the current working directory.
app.use(express.static(__dirname + "/../../dist"));
app.use(express.static(__dirname + "/../client/media"));

console.log(`Current directory is ${__dirname}`);

let result = {};
app.post("/fetchweather", fetchWeather);

//below method will execute when the request is received at /fetchweather end point.
function fetchWeather(req, resp) {
  console.log("Request received. fetchWeather method started.");
  let travelData = req.body;
  console.log(
    `Travel location & date received on server side is ${travelData.location} and ${travelData.journeyDate}`
  );
  //below will return current date in string format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];
  let todayDate = new Date(today);
  let journeyDate = new Date(travelData.journeyDate);
  let diffInTime = journeyDate.getTime() - todayDate.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24); 
  console.log(`User will travel after ${diffInDays} days`);
  result.afterDays = diffInDays;
  //creating urls...
  let geonamesurl = `http://api.geonames.org/searchJSON?q=${travelData.location}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
   fetchData(geonamesurl).then(geonamesobj =>{
       //below if is to check whether user entered a valid location.
       if(geonamesobj.totalResultsCount==0){
           console.log(`Invalid location.`);
         throw new Error("Invalid location entered.");
       }else{
            return getLatLong(geonamesobj);
       }
    
  }).then(latlong =>{
      let weatherbiturl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latlong.latitude}&lon=${latlong.longitude}&days=${diffInDays+1}&key=${process.env.WEATHERBIT_API_KEY}`;
      return fetchData(weatherbiturl);
  }).then(weatherbitobj =>{
    getTemperatureFromWeatherBit(weatherbitobj);
    let pixabayurl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${travelData.location}&image_type=photo`;
    return fetchData(pixabayurl);
  }).then(pixabayobj =>{
    if(pixabayobj.total==0){
      console.log("No image found for entered location. Therefore, Requesting again for country image.")
      pixabayurl = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${result.countryName}&image_type=photo`;
      fetchData(pixabayurl).then(pixabayobj =>{
        getImageFromPixabay(pixabayobj);
        resp.send(result);
      })
    }else{
      getImageFromPixabay(pixabayobj);
      resp.send(result);
    }
   
  }).catch(error =>{
      console.log(`Error occured in fetching response from some API. Error=> ${error}`);
      result = {
        errormsg: "Error Occured!Server could not process your request. Please re-check location or try again."
      };
      resp.send(result);
  });
  
}

app.get("/", function(req, res) {
  res.sendFile("index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8090, function() {
  console.log("Travel app listening on port 8090!");
});


//below method will fetch data from any third party url passed to it.
const fetchData = async (url) => {
    console.log(`fetchData called for url ${url}`);
    const respStream = await fetch(url);
    try {
      const response = await respStream.json();
      //below return statement implicitly get converted to Promise.resolve(response)
      return response;
    } catch (error) {
      console.log("error occured in fetching response from third party server", error);
    }
  };
  //this method will fetch lat, long, countryname, cityname from geonames json object.
  const getLatLong = geonamesObj =>{
      console.log(`getLatLong started`);
      let latlong = {};
     latlong.longitude = geonamesObj.geonames[0].lng;
     latlong.latitude = geonamesObj.geonames[0].lat;
     result.countryName = geonamesObj.geonames[0].countryName;
     result.cityName = geonamesObj.geonames[0].toponymName;
     return latlong;
  };

  //below method will extract weather info from weatherbit json and initialize the result object properties.
  const getTemperatureFromWeatherBit = weatherbitObj =>{
      console.log(`getTemperatureFromWeatherBit started`)
    const lastObj = weatherbitObj.data[weatherbitObj.data.length-1];
    result.maxtemp = lastObj.max_temp;
    result.mintemp = lastObj.min_temp;
    result.avgtemp = lastObj.temp;
    result.description = lastObj.weather.description;

  }

  //below method will fetch the url of location image from pixabay json and initialize the result object property.
  const getImageFromPixabay = pixabayObj =>{
      console.log(`getImageFromPixabay started`)
      console.log(pixabayObj);
    result.imgurl = pixabayObj.hits[0].largeImageURL;

  }

  export{ fetchData, getLatLong };