const { app, BrowserWindow } = require("electron")

function createWindow() {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setAutoHideMenuBar(true)

  // e carregar o index.html do aplicativo.
  win.loadFile("src/html/index.html")
}

app.on("ready", createWindow)
