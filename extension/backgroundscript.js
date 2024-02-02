(function(n) {
    typeof define === "function" && define.amd ? define(n) : n();
})((function() {
    "use strict";
    var listenToKeyboardEvent = function(n) {
        console.info("->", "listening", n);
    };
    chrome.commands.onCommand.addListener(listenToKeyboardEvent);
}));
