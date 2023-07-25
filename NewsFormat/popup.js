document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['todayContent'], function(result) {
        console.log("Content loaded: ", result.todayContent);
        let content = result.todayContent || '';
        let date = new Date();
        let dateString = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
        let header = dateString + ' 知道AI新闻 | 生活很慢，AI很快\n\n';
        let htmlContent = '<p style="color: black; font-size: 20px; font-weight: bold;">' + header + '</p>';

        let lines = content.split('\n');
        let todayLines = [];

        // 根据当前日期筛选出当天的文本
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] === dateString) {
                todayLines = lines.slice(i + 1);
                break;
            }
        }

        for (let i = 0; i < todayLines.length; i++) {
            if (todayLines[i]) {
                htmlContent += '<p style="text-align: left; font-size: 16px;">' + (i + 1) + '. ' + todayLines[i] + '</p>';
            }
        }

        document.getElementById('content').innerHTML = htmlContent;
    });
});
