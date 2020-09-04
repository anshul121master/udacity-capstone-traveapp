import { sendTravelData } from '../src/client/js/application'
const dotenv = require('dotenv');
dotenv.config();
describe("To test server response in case of valid and invalid location input", () =>{
    test('Test to check whether APIs are working as expected on valid location input', async() => {
        let userTravelInfo= {
            location: "mumbai",
            journeyDate:"2020-09-10"
        };
        const url = `http://localhost:8090/fetchweather`;
        const data = await sendTravelData(url, userTravelInfo);
        const stringdata = JSON.stringify(data);
        expect(stringdata).toMatch(/"cityName":"Mumbai","maxtemp"/);
    })

    test('Test to check whether APIs are working as expected on invalid location input', async() => {
        let userTravelInfo= {
            location: "qwerty",
            journeyDate:"2020-09-10"
        };
        const url = `http://localhost:8090/fetchweather`;
        const data = await sendTravelData(url, userTravelInfo);
        const stringdata = JSON.stringify(data);
        expect(stringdata).toMatch(/"errormsg"/);
    });
});
