//import { handleSubmit } from '../src/client/js/formHandler'
import { makeRequest } from '../src/client/js/formHandler'
const dotenv = require('dotenv');
dotenv.config();
//import { updateUI } from '../src/client/js/formHandler'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
test('Test to check whether API response is success', async() => {
    let payload= {
        text: "Main dishes were quite good, but desserts were too sweet for me."
    };
    const url = `http://localhost:8090/fetchsentiments`;
    const data = await makeRequest(url, payload);
    const stringdata = JSON.stringify(data);
    expect(stringdata).toMatch(/{"status":{"code":"0","msg":"OK","credits":"1"/);
});