const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const botToken = '7413690554:AAHtjqSJH7w3RIv0thp5waF-fXb1TA-rAds';
const dataFile = 'server/user_data.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Helper function to read user data from file
const readUserData = () => {
    if (fs.existsSync(dataFile)) {
        const rawData = fs
