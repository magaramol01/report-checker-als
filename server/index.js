const express = require('express')
const cors = require('cors')
const fs = require('fs') // File System module to handle file operations
const { makeHttpRequest } = require('./makeHttpRequest')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json()) // For parsing application/json

// API config
const baseURL = "https://atlantic-lloyd.cloudfleetmanager.com/papi";
const apiURL = {
    "NoonReport": `${baseURL}/noon-reports`,
    "ArrivalReport": `${baseURL}/arrival-reports`,
    "DepartureReport": `${baseURL}/departure-reports`,
    "SeaPassageReport": `${baseURL}/begin-of-sea-passage-reports`,
    "BorderCrossingReport": `${baseURL}/border-crossing-reports`,
    "PositionReport": `${baseURL}/position-reports`,
};

const username = 'Smartship';
const password = 'Smartship@123';
const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

var requestFormats = {
    VersionStamp: 1,
    VersionStampAsByteArray: "AAAAAAAAAAE=",
    VesselIMOs: [],
};

app.post('/reports', async (req, res) => {
    let imos = req.body.imoNumber.split(',')
    requestFormats.VesselIMOs = imos

    let bigJsonData = await makeHttpRequest(apiURL[req.body.reportName], 'POST', requestFormats, authHeader,res);
    
    // Writing JSON data to a file named 'bigJsonData.jsn'
    fs.writeFile('bigJsonData.json', JSON.stringify(bigJsonData), function (err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send('Error writing file');
        }
        // Sending the file as a download to the client
        res.download('bigJsonData.json');
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
