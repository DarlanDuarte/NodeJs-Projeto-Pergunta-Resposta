const express = require("express");
const bodyParser = require('body-parser')
const connection = require('./database/database')

//Database
connection
  .authenticate().then(() =>{
    console.log('Conexão feita com o banco de dados')
  }).catch((error) => console.log(error))

const app = express();

//Estou dizendo para o express usar o EJS como View Engine do meu projeto
app.set("view engine", "ejs");

// Para utilizar os arquivos Staticos no Express
// Arquivos Staticos são arquivos CSS e Imagens e outros
app.use(express.static("public"));

// Comando que permite que se envie os dados do formulario e o bodyParse traduz em uma strutura em javaScript para usar dentro do projeto ou seja decodifica o que se envia no formulario
app.use(bodyParser.urlencoded({extended: false}))
//Permite com que se leia dados de formulario via JSON
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.render("index");
}); 


app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post('/saveform', (req, res) =>{
  let titulo = req.body.titulo
  let descricao = req.body.descricao
  res.send(`Formulario Recebido com Sucesso! Titulo: ${titulo} e Descriçao: ${descricao}`)
})







app.listen("8080", () => {
  console.log("App Rodando");
});

