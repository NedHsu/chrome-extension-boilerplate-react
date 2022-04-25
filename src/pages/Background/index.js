console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log(chrome.runtime);
// The extension's event handler
chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled');
    chrome.bookmarks.onChanged(() => {

    });
});

chrome.runtime.onSuspend.addListener(() => {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({ text: "" });
});
