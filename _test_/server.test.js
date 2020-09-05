import { fetchData } from '../src/server/server'
const dotenv = require('dotenv');
dotenv.config();
describe("To test at server side", () =>{
    test('Test to check whether API is at server side is responding or not', async() => {
        const url = `http://api.geonames.org/searchJSON?q=mumbaimaxRows=1&username=${process.env.GEONAMES_USERNAME}`;
        const data = await fetchData(url);
        const stringdata = JSON.stringify(data);
        expect(stringdata).toMatch(/{"totalResultsCount"/);
    })
});
