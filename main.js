const { app, BrowserWindow } = require('electron')
var path = require("path");

const server = require("./bin/www");

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let mainWindow;

function createWindow () {
  // Créer le browser window.
  mainWindow = new BrowserWindow({
    width: 1281,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'logo/64x64.ico')
  })
 

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:5000/economie-6e448f82-644e-4c4f-8f53-1bcd3a70ea49')

  // Ouvre les DevTools.
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (mainWindow === null) {
    createWindow()
  }
})
