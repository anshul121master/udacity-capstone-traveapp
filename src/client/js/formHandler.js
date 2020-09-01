import "regenerator-runtime/runtime.js";

const fetch = require("node-fetch");
function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("url").value;
  //document.querySelector("#username").textContent = `Hello! ${formText}`;
  if (Client.validateInput(formText)) {
    console.log("::: Form Submitted :::");
    let data = {
      text: "Main dishes were quite good, but desserts were too sweet for me."
    };
    Client.makeRequest("http://localhost:8090/fetchsentiments", data).then(
      function(meaningcloudjson) {
        Client.updateUI(meaningcloudjson);
      }
    );
  } else {
    console.log("Invalid Url. No api call will be made.");
    alert("Invalid Url. Could not submit form.");
  }
}

const makeRequest = async (url = "", data = {}) => {
  console.log("makeRequest called.");
  const resp = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const respjson = await resp.json();
    return respjson;
  } catch (error) {
    console.log("error occured in client", error);
  }
};
const updateUI = apirespjson => {
  console.log("updateUI started.");
  console.log(typeof apirespjson);
  //console.log(apirespjson);
  document.querySelector("#apiresults").textContent = JSON.stringify(
    apirespjson
  );
  const statusBlock = apirespjson.status;
  let str = "";
  for (const i in statusBlock) {
    str += statusBlock[i] + "\n";
  }
  console.log(str.trim());
  document.querySelector("#apidata").innerHTML = `<h2>${str}</h2>`;
};

//Note: Each function needs to be exported.
export { handleSubmit, makeRequest, updateUI };
