const { app, BrowserWindow } = require('electron')
const { ipcMain, dialog } = require('electron')
    // Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
    // chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.
let win;

function createWindow() {
    // Creazione della finestra del browser.
    win = new BrowserWindow({
        width: 900,
        height: 600,
        resizable: false,
        frame: false,
        icon: "icon.ico",
        webPreferences: {
            nodeIntegration: true
        }
    })

    // e carica l'index.html dell'app.

    //win.loadFile('index.html')
    win.loadURL('http://localhost:3000');


    // Apre il Pannello degli Strumenti di Sviluppo.
    //win.webContents.openDevTools()

    // Emesso quando la finestra viene chiusa.
    win.on('closed', () => {
        win.webContents.send('quit');
        // Eliminiamo il riferimento dell'oggetto window;  solitamente si tiene traccia delle finestre
        // in array se l'applicazione supporta più finestre, questo è il momento in cui 
        // si dovrebbe eliminare l'elemento corrispondente.
        win = null
    })
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on('ready', createWindow)

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on('window-all-closed', () => {
    // Su macOS è comune che l'applicazione e la barra menù 
    // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();

    }
})

app.on('activate', () => {
    // Su macOS è comune ri-creare la finestra dell'app quando
    // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
    if (win === null) {
        createWindow()
    }
})



ipcMain.on('open-information-dialog', (event) => {
    const options = {
        type: 'info',
        title: 'CIAO',
        message: "Ehm, ciao tizio curioso",
        buttons: ['Ciao']
    }
    dialog.showMessageBox(options, (index) => {
        event.sender.send('information-dialog-selection', index)
    })
})