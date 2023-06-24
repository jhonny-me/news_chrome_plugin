let port = chrome.runtime.connect({name: "newsFormatPort"});
document.addEventListener('mouseup', function(e) {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        if (!document.getElementById('newsFormatBtn')) {
            let btn = document.createElement('button');
            btn.id = 'newsFormatBtn';
            btn.innerText = '添加到列表';
            btn.style.position = 'fixed';
            btn.style.zIndex = 9999;
            btn.addEventListener('click', function() {
                port.postMessage({action: "addToToday", text: selectedText, url: window.location.href});
            });
            document.body.appendChild(btn);
        }
        let btn = document.getElementById('newsFormatBtn');
        btn.style.left = e.pageX + 'px';
        btn.style.top = e.pageY + 'px';
        btn.style.display = 'block';
    } else {
        let btn = document.getElementById('newsFormatBtn');
        if (btn) {
            btn.style.display = 'none';
        }
    }
});
