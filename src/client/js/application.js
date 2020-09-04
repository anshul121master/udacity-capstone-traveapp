import "regenerator-runtime/runtime.js";

const fetch = require("node-fetch");

//below method will execute when user will click on submit button in form.
function handleSubmit(event) {
  console.log("handleSubmit method started.");
  event.preventDefault();
  document.querySelector("#lastsearch").textContent = "Refreshing..Please wait...";
  // check what text was put into the form field
  let location = document.querySelector("#location").value;
  let journeyDate = document.querySelector("#startdate").value;
  let endDate = document.querySelector("#enddate").value;
  
  console.log(`Location entered is ${location} and travel date is ${journeyDate}`);
  
  if (Client.validateLocation(location)) {
    console.log("::: Form Submitted :::");
    calculateTripLength(journeyDate, endDate);
    let travelData = {
      location: location,
      journeyDate: journeyDate
    };
    Client.sendTravelData("http://localhost:8090/fetchweather", travelData).then(
      result => {
        document.querySelector("#lastsearch").textContent = "";
        Client.updateUI(result);
      }
    );
  } else {
    console.log("Invalid location. Form can't be submitted.");
    alert("Location can't be left blank and should contain characters only.");
  }
}

//Below method will send location and travel date to our webserver.
const sendTravelData = async (url = "", data = {}) => {
  console.log("sendTravelData called.");
  const resp = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const result = await resp.json();
    return result;
  } catch (error) {
    console.log("error occured in client", error);
  }
};

//below method will calculate the length of the trip.
const calculateTripLength = (journeyDate, endDate) =>{
  console.log("calculateTripLength method started.");
  let startDate = new Date(journeyDate);
  let tripendDate = new Date(endDate);
  let diffInTime = tripendDate.getTime() - startDate.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24); 
  document.querySelector("#triplength").textContent = `Your trip is of ${diffInDays} day(s)`;
}

//this method will receive an object containing temperature and image of location and updates UI
const updateUI = result => {
  console.log("updateUI started.");
  if('errormsg' in result){
    document.querySelector("#mintemp").textContent = result.errormsg;
  }else{
  document.querySelector("img").src = result.imgurl;
  document.querySelector("#afterdays").textContent = `Hurray! You are ${result.afterDays} days to Go to ${result.cityName}, ${result.countryName}`;
  document.querySelector("#mintemp").textContent = `Min temperature is ${result.mintemp}`;
  document.querySelector("#maxtemp").textContent = `Max temperature is ${result.maxtemp}`;
  document.querySelector("#avgtemp").textContent = `Average temperature recorded is ${result.avgtemp}`;
  document.querySelector("#description").textContent = `Description of weather: ${result.description}`;
  //set the retrieved result to browser's localStorage.
  localStorage.setItem("result", JSON.stringify(result));
  }
};


//Note: Each function needs to be exported.
export { handleSubmit, sendTravelData, updateUI, calculateTripLength };
