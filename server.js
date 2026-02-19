const express = require("express");
require("dotenv").config();

const routes = require("./src/routes")

const app = express(); 

app.use(express.json());
app.use(routes)

app.listen(8080, () => {

    console.log("servidor da api rodando em 8080")
});