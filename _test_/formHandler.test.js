//import { handleSubmit } from '../src/client/js/formHandler'
import { fetchSentiments } from '../src/client/js/formHandler'
const dotenv = require('dotenv');
dotenv.config();
//import { updateUI } from '../src/client/js/formHandler'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
test('Test to check whether API response is success', async() => {
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&model=general&lang=en`;
    const data = await fetchSentiments(url);
    const stringdata = JSON.stringify(data);
    expect(stringdata).toMatch(/{"status":{"code":"0","msg":"OK","credits":"1"/);
});