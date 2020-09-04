import { handleSubmit, sendTravelData, updateUI, calculateTripLength } from './js/application'
import { validateLocation } from './js/validatelocation'
import './styles/gridsetup.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/main.scss'
import './styles/aside.scss'

console.log("Executing Client side Js");

//checkLocalStorage must be defined first before call if we use the initilization syntax
const checkLocalStorage = () =>{
    console.log("checkLocalStorage started");
    let result = localStorage.getItem("result");
    if(result!==null){
        document.querySelector("#lastsearch").textContent = `You last searched for:`;
        updateUI(JSON.parse(result));
    }
}
document.addEventListener("DOMContentLoaded", checkLocalStorage);

//setting min attribute in calender
let today = new Date().toISOString().split('T')[0];
document.querySelector("#startdate").setAttribute('min', today);

//Below method will enable and set the trip end date min value to start date to avoid user error.
document.querySelector("#startdate").addEventListener("change", (event) =>{
    console.log("focus lost from date of journey. Validating startdate to enable enddate");
    console.log(`start date is ${typeof event.target.value}`);
    if(event.target.value!==""){
        console.log(event.target.value);
       document.querySelector("#enddate").disabled = false;
        document.querySelector("#enddate").setAttribute("min", event.target.value);
    }
})

document.querySelector("#inputform").addEventListener("submit", handleSubmit);

export {
    handleSubmit, validateLocation, sendTravelData, updateUI, calculateTripLength
   }
