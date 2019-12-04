const express = require("express")
const routes = require("./routes")
const cors = require("cors")

class AppController {
  constructor() {
    this.express = express()

    this.middleware()
    this.routes()
  }

  middleware() {
    this.express.use(cors())
    this.express.use(express.json())
    this.express.disable("x-powered-by")
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = new AppController().express
