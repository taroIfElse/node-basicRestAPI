const express = require("express");
const cors = require("cors");
const router = require("../routes/user.routes");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    //Middlewares
    this.middleWares();

    //Rutas de mi app
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port ", this.port);
    });
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
