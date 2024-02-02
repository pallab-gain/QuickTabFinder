(function(n) {
    typeof define === "function" && define.amd ? define(n) : n();
})((function() {
    "use strict";
    var onAllTabs = function(n) {
        console.info("-> open tabs", n);
    };
    var listTabs = function() {
        chrome.tabs.query({}, onAllTabs);
    };
    document.addEventListener("DOMContentLoaded", listTabs);
}));
