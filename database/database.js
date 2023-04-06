const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'cada362514', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection


/*=====================================================
* Connection => Nome do Database, userName, password, 
* dialect: /* one of 'mysql' | 'postgres' | 'sqlite' |'mariadb' | 'mssql'|'db2' | 'snowflake' | 'oracle' 
*
*
=======================================================*/