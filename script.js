document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('hidden');
        document.querySelector('#mainContent').classList.remove('hidden');
    }, 4000);

    var balanceElement = document.getElementById("balance");
    var countElement = document.getElementById("count");

    var balance = 0;
    var miningRates = {
        hour: 2 / 3600,  // 2 YNG per hour
        day: 30 / 86400, // 30 YNG per day
        week: 280 / 604800 // 280 YNG per week
    };

    var totalMiningRate = miningRates.hour + miningRates.day + miningRates.week;

    function updateBalance() {
        balance += totalMiningRate * 0.5; // Update every 0.5 seconds
        balanceElement.textContent = balance.toFixed(8);
        countElement.textContent = balance.toFixed(10);
    }

    document.getElementById("startButton").addEventListener("click", function() {
        setInterval(updateBalance, 500);
    });
});
