import "regenerator-runtime/runtime.js";

const fetch = require("node-fetch");
function handleSubmit(event) {
  console.log("handleSubmit method started.");
  event.preventDefault();

  // check what text was put into the form field
  let location = document.querySelector("#location").value;
  let journeyDate = document.querySelector("#date").value;
  
  console.log(`Location entered is ${location} and travel date is ${journeyDate}`);
  
  if (Client.validateLocation(location)) {
    console.log("::: Form Submitted :::");
    let travelData = {
      location: location,
      journeyDate: journeyDate
    };
    Client.sendTravelData("http://localhost:8090/fetchweather", travelData).then(
      result => {
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

//this method will receive an object containing temperature and image of location and updates UI
const updateUI = result => {
  console.log("updateUI started.");
  console.log(typeof result);
  
};

//Note: Each function needs to be exported.
export { handleSubmit, sendTravelData, updateUI };
