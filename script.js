var countUpOptions = {
    separator: " "
};

var count = new CountUp("count", 0.00022793, 0.0101595600, 13, 19981000, countUpOptions);

count.start(countUpOnComplete);

function countUpOnComplete() {
    var countUpModal = UIkit.modal("#modal-countup");
    countUpModal.show();
    setTimeout(function() {
        countUpModal.hide();
        setTimeout(function() {
     countUpModal.$destroy(true);
        }, 3000);
    }, 5000);
}

