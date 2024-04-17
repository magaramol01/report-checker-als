const axios = require('axios');

async function makeHttpRequest(url, method = 'GET', body = null, authHeader,res) {
    try {
        const response = await axios({
            url,
            method,
            data: body, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            }
        });

        return response.data;
    } catch (error) {
        // return JSON.stringify([])
        // new Error(`Error making HTTP request: ${error}`);
        return res.status(500).send(error);
    }
}

module.exports = { makeHttpRequest };