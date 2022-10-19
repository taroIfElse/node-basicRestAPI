const express = require("express");
const cors = require("cors");
const router = require("../routes/user.routes");
const { dbConnection } = require("../database/config.db");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    this.connectDatabase();

    this.middleWares();

    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port ", this.port);
    });
  }

  async connectDatabase() {
    await dbConnection();
  }

  middleWares() {
    //Directorio publico
    this.app.use(express.static("public"));
    //Lectura y parseo del body
    this.app.use(express.json());
    //CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }
}

module.exports = Server;
