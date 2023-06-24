chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "newsFormatPort") {
        port.onMessage.addListener(function(msg) {
            console.log("Message received: ", msg);
            let url = new URL(msg.url);
            let domain = url.hostname;
            let textToAdd = `${msg.text} 【${domain}】\n`;

            chrome.storage.local.get(['todayContent'], function(result) {
                let content = result.todayContent || '';
                content += textToAdd;
                chrome.storage.local.set({todayContent: content}, function() {
                    console.log("Content saved: ", content);
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                        port.postMessage({status: "error"});
                    } else {
                        port.postMessage({status: "success"});
                    }
                });
            });
        });
    }
});