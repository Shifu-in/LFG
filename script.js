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

    document.getElementById("partnerButton").addEventListener("click", function() {
        document.querySelector('#mainContent').classList.add('hidden');
        document.querySelector('#partnerContent').classList.remove('hidden');
        document.getElementById('partnerBalance').textContent = balanceElement.textContent;
    });

    var totalEarned = 0;
    var subscribedChannels = {};

    window.subscribe = function(channelId, channelUrl) {
        if (subscribedChannels[channelId]) {
            alert('You have already subscribed to this channel.');
            return;
        }

        subscribedChannels[channelId] = true;

        // Open the channel URL in a new tab
        window.open(channelUrl, '_blank');

        // Add the reward after 15 seconds
        setTimeout(function() {
            totalEarned += 5000;
            document.getElementById('totalEarned').textContent = totalEarned;

            // Update the balance on both the partner page and the main page
            balance += 5000;
            balanceElement.textContent = balance.toFixed(8);
            document.getElementById('partnerBalance').textContent = balance.toFixed(8);
        }, 15000);
    };

    window.goBack = function() {
        document.querySelector('#partnerContent').classList.add('hidden');
        document.querySelector('#mainContent').classList.remove('hidden');
    };
});
