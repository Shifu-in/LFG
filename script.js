document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;

    const user = tg.initDataUnsafe?.user || {};
    const userId = user.id || 'unknown';
    const username = user.username || 'unknown';

    let balance = 0;

    // Получение данных пользователя с сервера
    fetch(`http://localhost:3000/get_user_data/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                balance = data.data.balance;
                updateBalanceDisplay();
            } else {
                console.error('Error fetching user data:', data);
            }
        })
        .catch(error => console.error('Error fetching user data:', error));

    // Функция для обновления баланса на экране
    function updateBalanceDisplay() {
        document.getElementById("balance").textContent = balance.toFixed(8);
        document.getElementById("count").textContent = balance.toFixed(10);
    }

    // Отправка данных пользователя на сервер
    function saveUserData() {
        fetch('http://localhost:3000/save_user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                username: username,
                balance: balance
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'success') {
                console.error('Error saving user data:', data);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Функция для обновления баланса
    var miningRates = {
        hour: 2 / 3600,  // 2 YNG per hour
        day: 30 / 86400, // 30 YNG per day
        week: 280 / 604800 // 280 YNG per week
    };

    var totalMiningRate = miningRates.hour + miningRates.day + miningRates.week;

    function updateBalance() {
        balance += totalMiningRate * 0.5; // Update every 0.5 seconds
        updateBalanceDisplay();
        saveUserData(); // Сохраняем данные каждый раз при обновлении баланса
    }

    document.getElementById("startButton").addEventListener("click", function() {
        setInterval(updateBalance, 500);
    });

    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
        document.querySelector('#mainContent').classList.remove('hidden');
    }, 4000);
});
