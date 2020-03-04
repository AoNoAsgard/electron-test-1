const remote = require('electron').remote;
const { ipcRenderer } = require('electron')

document.getElementById("btnLaterale").addEventListener("click", function(e) {
    const window = remote.getCurrentWindow();
    var btn = document.getElementById("btnLaterale")
        //ipcRenderer.send('open-information-dialog');
    var Pannello = document.getElementById("menuLaterale");
    if (Pannello.hidden == true) {
        Pannello.hidden = false;
        btn.style.left = "268px";
    } else {
        Pannello.hidden = true;
        btn.style.left = "0px";

    }
});