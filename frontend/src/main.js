const { app, BrowserWindow } = require("electron")
require("dotenv/config")

function createWindow() {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setAutoHideMenuBar(true)
  win.setAppDetails

  // e carregar o index.html do aplicativo.
  win.loadFile("src/html/index.html")
}

app.on("ready", createWindow)
