const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const botToken = '7403662953:AAGrLcwLbP9FPIdcTKFvIpfNVCKQblkOFJ0';
const dataFile = 'server/user_data.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Helper function to read user data from file
const readUserData = () => {
    if (fs.existsSync(dataFile)) {
                const rawData = fs.readFileSync(dataFile);
        return JSON.parse(rawData);
    }
    return {};
};

// Helper function to write user data to file
const writeUserData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.post('/save_user_data', (req, res) => {
    const { userId, username, balance } = req.body;
    console.log('Received user data:', { userId, username, balance });

    const userData = readUserData();

    // Update user data
    userData[userId] = { username, balance };

    // Write updated data back to file
    writeUserData(userData);

    // Отправка данных боту
    const message = `User data updated:\nUser ID: ${userId}\nUsername: ${username}\nBalance: ${balance}`;
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: userId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Message sent to bot successfully');
            res.json({ status: 'success', message: 'User data saved and sent to bot successfully' });
        } else {
            console.error('Failed to send message to bot:', data);
            res.json({ status: 'success', message: 'User data saved but failed to send to bot' });
        }
    })
    .catch(error => {
        console.error('Error sending message to bot:', error);
        res.json({ status: 'success', message: 'User data saved but failed to send to bot' });
    });
});

app.get('/get_user_data/:userId', (req, res) => {
    const { userId } = req.params;
    const userData = readUserData();
    if (userData[userId]) {
        res.json({ status: 'success', data: userData[userId] });
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

