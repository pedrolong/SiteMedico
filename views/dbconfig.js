// dbconfig.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'Medical'
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ' + err.message);
  } else {
    console.log('Conexão ao banco de dados MySQL bem-sucedida');
  }
});

module.exports = db;


