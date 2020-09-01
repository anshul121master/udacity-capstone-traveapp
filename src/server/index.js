const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");


const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

//path for static directory in express.static is always relative to the current working directory.
app.use(express.static(__dirname+'/../../dist'))

console.log("Current directory is")
console.log(__dirname)

app.post('/fetchsentiments', fetchsentiments)

 async function fetchsentiments(req, resp) {
    console.log(`Request received for fetchsentiments.`)
    console.log(`Request body containing text is ${req.body.text}`)
    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${req.body.text}&model=general&lang=en`;
    const jsonstream = await fetch(url)
    try{
        const jsonresp = await jsonstream.json()
        console.log(`Jsonresp sending to client => ${jsonresp}`)
        resp.send(jsonresp)
    }catch(error){
        console.log("error occured in fetching response", error)
    }
}
app.get('/', function (req, res) {
     res.sendFile('index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8090, function () {
    console.log('Example app listening on port 8090!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
