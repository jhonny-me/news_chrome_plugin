document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['todayContent'], function(result) {
        let content = result.todayContent || '';
        let date = new Date();
        let dateString = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0');
        let header = dateString + ' 知道AI新闻 | 生活很慢，AI很快\n\n';
        let htmlContent = '<p style="color: black; font-size: 20px; font-weight: bold;">' + header + '</p>';

        let lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) {
                htmlContent += '<p style="text-align: left;">' + (i + 1) + '. ' + lines[i] + '</p>';
            }
        }

        document.getElementById('content').innerHTML = htmlContent;
    });
});
