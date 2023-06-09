const sequelize = require('sequelize')
const connection = require('./database')


const Resposta = connection.define('respostas', {
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },

    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(() =>{
    console.log(`Tabela Resposta Criada`)
})

module.exports = Resposta