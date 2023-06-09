const express = require("express");
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

//Database
connection
  .authenticate().then(() =>{
    console.log('Conexão bem sucedida com o banco de dados')
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
  Pergunta.findAll({raw: true, order: [
    ['id', 'DESC'] // DESC => Decrescente e ASC => Crescente
  ]}).then((perguntas) =>{
    res.render('index', {
      pergunta: perguntas
    })
  })
}); 


app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post('/saveform', (req, res) =>{
  let titulo = req.body.titulo
  let descricao = req.body.descricao
  
  Pergunta.create({
    titulo: titulo,
    descriçao: descricao,
  }).then(() =>{
    res.redirect('/')
  })
})


app.get('/pergunta/:id', (req, res) =>{
  const id = req.params.id

  Pergunta.findOne({
    where: {id: id}

  }).then((pergunta) =>{
    if(pergunta != undefined){
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [
          ['id', 'DESC']
        ]

      }).then((respostas) =>{
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    }else{
      res.redirect('/')
    }
  })
})


app.post('/responder', (req, res) =>{
  const corpo = req.body.corpo
  const perguntaId = req.body.pergunta

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId, 

  }).then(() =>{
    res.redirect(`/pergunta/${perguntaId}`)
  })

})



app.listen(8080, () => {
  console.log("App Rodando");
});

