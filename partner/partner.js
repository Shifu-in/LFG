var totalEarned = 0;

function subscribe(channelId) {
    totalEarned += 5000;
    document.getElementById('totalEarned').textContent = totalEarned;
    // Update the balance on the main page
    var balanceElement = window.opener.document.getElementById('balance');
    var currentBalance = parseFloat(balanceElement.textContent);
    currentBalance += 5000;
    balanceElement.textContent = currentBalance.toFixed(8);
}

function goBack() {
    window.history.back();
}
