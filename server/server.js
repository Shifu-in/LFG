const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Настройка обслуживания статических файлов из папки "public"
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/get_user_data/:userId', (req, res) => {
  const userId = req.params.userId;
  const dataPath = path.join(__dirname, 'user_data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  if (data[userId]) {
    res.json({ status: 'success', data: data[userId] });
  } else {
    res.json({ status: 'error', message: 'User not found' });
  }
});

app.post('/save_user_data', (req, res) => {
  const { userId, username, balance } = req.body;
  console.log('Received data:', { userId, username, balance }); // Логирование данных
  const dataPath = path.join(__dirname, 'user_data.json');
  let data = {};

  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  data[userId] = { username, balance };
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  res.json({ status: 'success' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
