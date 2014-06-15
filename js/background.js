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

function handleNotificationCheck(data, type, typeString) {
    if (data.find(".notification").length > 0) {
        var notification = data.find(".notification");
        var newCount = notification.text();

        chrome.notifications.create(notificationId + "-" + type, {
            type: "basic",
            title: typeString + " update",
            iconUrl: "http://csgolounge.com/img/my_" + type + "s.png",
            isClickable: true,
            message: newCount == 1 ? "You have 1 new comment on your " + type + "s" : "You have " + newCount + " new comments on your " + type + "s"
        }, function () {
            notificationId++;
        });
    }
}


function checkForNotifications() {
    $.get("http://csgolounge.com/", function (data) {
        var trades = $(data).find('a[href$="mytrades"]:first');
        var offers = $(data).find('a[href$="myoffers"]:first');

        handleNotificationCheck(trades, "trade", "Trade");
        handleNotificationCheck(offers, "offer", "Offer");
    });
    setTimeout(checkForNotifications, 15000);
}

checkForNotifications();