chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "addToToday") {
        let url = new URL(sender.tab.url);
        let domain = url.hostname;
        let textToAdd = request.text + "&#8203;``oaicite:{"number":1,"invalid_reason":"Malformed citation 【\" + domain + \"】"}``&#8203;\n";

        chrome.storage.local.get(['todayContent'], function(result) {
            let content = result.todayContent || '';
            content += textToAdd;
            chrome.storage.local.set({todayContent: content}, function() {
                sendResponse({status: "success"});
            });
        });
    }
    return true;
});
