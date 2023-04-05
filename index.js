const express = require('express')

const app = express()

//Estou dizendo para o express usar o EJS como View Engine do meu projeto
app.set('view engine', 'ejs')

// Para utilizar os arquivos Staticos no Express
// Arquivos Staticos são arquivos CSS e Imagens e outros
app.use(express.static('public'))

app.get('/:nome/:lang', (req, res) =>{
    /*  const nome = 'Darlan Duarte'
    const lang = 'NodeJs' */
    const nome = req.params.nome
    const lang = req.params.lang
    const exibirMsg = true
    const produtos = [
        {nome: 'Doritos', preço: 3.14},
        {nome: 'Coca-Cola', preço: 5},
        {nome: 'Leite', preço: 2},
        {nome: 'Carne', preço: 8},
        {nome: 'RedBull', preço: 12},
    ]
    res.render('index', {
        nome: nome,
        lang: lang,
        empresa: 'CloudMobile',
        inscritos: 50000,
        msg: exibirMsg,
        produtos,
    })

})


app.get('/perguntar', (req, res) =>{
    res.render('perguntar')
})


app.listen('8080', () =>{
    console.log('App Rodando')
})