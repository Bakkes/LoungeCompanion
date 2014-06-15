String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

chrome.notifications.onClicked.addListener(function (id, index) {
    if (id.endsWith("-trade")) {
        chrome.tabs.create({
            url: "http://csgolounge.com/mytrades"
        });
    } else if (id.endsWith("-offer")) {
        chrome.tabs.create({
            url: "http://csgolounge.com/myoffers"
        });
    }
});

var notificationId = 1337;

function checkForNotifications() {
    $.get("http://csgolounge.com/", function (data) {
        data = $(data);
        var trades = data.find('a[href$="mytrades"]:first');
        var offers = data.find('a[href$="myoffers"]:first');

        if (trades.find(".notification").length > 0) {
            var notification = trades.find(".notification");
            var newCount = notification.text();

            chrome.notifications.create(notificationId + "-trade", {
                type: "basic",
                title: "Trade update",
                iconUrl: "http://csgolounge.com/img/my_trades.png",
                isClickable: true,
                message: newCount == 1 ? "You have 1 new comment on your trades" : "You have " + newCount + " new comments on your trades"
            }, function () {
                notificationId++;
            });
        }
        if (offers.find(".notification").length > 0) {
            var notification = offers.find(".notification");
            var newCount = notification.text();

            chrome.notifications.create(notificationId + "-offer", {
                type: "basic",
                title: "Offer update",
                isClickable: true,
                iconUrl: "http://csgolounge.com/img/my_offers.png",
                message: newCount == 1 ? "You have 1 new comment on your offers" : "You have " + newCount + " new comments on your offers"
            }, function () {
                notificationId++;
            });
        }

    });
    setTimeout(checkForNotifications, 15000);
}

checkForNotifications();