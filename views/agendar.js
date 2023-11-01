// consultas.js

const express = require('express');
const router = express.Router();
const db = require('./dbconfig');

// Rota para exibir a página de agendamento
router.get('/Tela de agenda', (req, res) => {
  res.render('Tela de agenda'); // Renderize a página de agendamento
});

// Rota para processar o agendamento
router.post('/Tela de agenda', (req, res) => {
  const { data, horario, especialidade } = req.body;
  console.log('Agendando consulta!');

  const sql = 'INSERT INTO consultas (data, horario, especialidade) VALUES (?, ?, ?, ?)';

  db.query(sql, [data, horario, especialidade], (err, result) => {
    console.log('Enviando ao BD :Agendando consulta!:');
    if (err) {
      console.error('Erro na inserção de dados: ' + err.message);
      return res.status(500).send('Erro na inserção de dados');
    }
  });
});

module.exports = router;