const express = require("express");

const app = express();

//Estou dizendo para o express usar o EJS como View Engine do meu projeto
app.set("view engine", "ejs");

// Para utilizar os arquivos Staticos no Express
// Arquivos Staticos são arquivos CSS e Imagens e outros
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
}); 


app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.listen("8080", () => {
  console.log("App Rodando");
});
