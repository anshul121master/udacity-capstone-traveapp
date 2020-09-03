import { handleSubmit, sendTravelData, updateUI } from './js/formHandler'
import { validateLocation } from './js/inputValidate'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

console.log("Executing Client side Js");
//setting min attribute in calender
let today = new Date().toISOString().split('T')[0];
document.querySelector("#date").setAttribute('min', today);

document.querySelector("#inputform").addEventListener("submit", handleSubmit);

export {
    handleSubmit, validateLocation, sendTravelData, updateUI
   }
