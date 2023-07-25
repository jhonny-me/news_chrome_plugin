chrome.contextMenus.create({
    id: "addToToday",   
    title: "添加到今日新闻",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "addToToday") {
        let textToAdd = `${info.selectionText}【${new URL(tab.url).hostname}】\n`;
        chrome.storage.local.get(['todayContent'], function(result) {
            let content = result.todayContent || '';
            content += textToAdd;
            chrome.storage.local.set({todayContent: content}, function() {
                console.log("Content saved: ", content);
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        });
    }
});
