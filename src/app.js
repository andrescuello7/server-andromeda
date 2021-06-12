const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Connection
mongoose.connect(
  `mongodb+srv://${process.env.UserConnection}:${process.env.UsePassword}@cluster0.qa9gg.mongodb.net/4ndromeda?retryWrites=true&w=majority`,
  {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: false,
  }
);

//Settings
app.set("port", process.env.PORT || 5000);
app.use(cors());

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuario", require("./routes/usuarios"));
app.use("/api/consulta", require("./routes/consult"));
app.use("/api/publicacion", require("./routes/publicacion"));

//Server
app.listen(app.get("port"), () => {
  console.log("Servidor en funcionamiento en puerto", app.get("port"));
});
