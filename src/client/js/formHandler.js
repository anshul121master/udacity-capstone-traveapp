import "regenerator-runtime/runtime.js";

const fetch = require("node-fetch");
function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  //document.querySelector("#username").textContent = `Hello! ${formText}`;
  Client.checkForName(formText);
  console.log("::: Form Submitted :::");
  fetch("http://localhost:8082/apikey")
    .then(res => res.json())
    .then(function(apikeyjson) {
      //make url
      const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apikeyjson.application_key}&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`;
      console.log(`url is ${url}`);
      return Client.fetchSentiments(url);
    })
    .then(function(apirespjson) {
      Client.updateUI(apirespjson);
    });
}

const fetchSentiments = async url => {
  console.log("fetchSentiments started.");
  const response = await fetch(url);
  try {
    const jsonresp = await response.json();
    //console.log(jsonresp);
    return jsonresp;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = apirespjson => {
  console.log("updateUI started.");
  //console.log(apirespjson);
  document.querySelector("#apiresults").textContent = JSON.stringify(
    apirespjson
  );
};

//Note: Each function needs to be exported.
export { handleSubmit, fetchSentiments, updateUI };
