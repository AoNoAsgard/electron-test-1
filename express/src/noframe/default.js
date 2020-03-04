(function() {

    const remote = require('electron').remote;
    const { ipcRenderer } = require('electron')


    function init() {
        document.getElementById("back").addEventListener("click", function(e) {
            goBack();
        });

        document.getElementById("min-btn").addEventListener("click", function(e) {
            const window = remote.getCurrentWindow();
            window.minimize();
        });

        document.getElementById("BEH").addEventListener("click", function(e) {
            const window = remote.getCurrentWindow();
            ipcRenderer.send('open-information-dialog');
        });

        document.getElementById("close-btn").addEventListener("click", function(e) {
            const window = remote.getCurrentWindow();
            window.close();
        });
    };

    function goBack() {
        window.history.back();
    }

    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            init();
        }
    };


})();