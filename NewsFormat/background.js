chrome.contextMenus.create({
    id: "addToToday",   
    title: "添加到今日新闻",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "addToToday") {
        let textToAdd = `${info.selectionText}【${new URL(tab.url).hostname}】\n`;
        let date = new Date();
        let dateString = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
        chrome.storage.local.get(['todayContent'], function(result) {
            let content = result.todayContent || '';
            if (content.includes(dateString)) {
                content += textToAdd;    
            } else {
                content += dateString + '\n' + textToAdd;
            }

            chrome.storage.local.set({todayContent: content}, function() {
                console.log("Content saved: ", content);
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        });
    }
});
