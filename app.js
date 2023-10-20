const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); // Serve arquivos estáticos na pasta atual (onde está sua página de agendamento)

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'Medical'
});

// Configure a view engine (EJS in this case)
app.set('view engine', 'ejs');

// Render the agendamento.ejs view
app.get('/agendamento', (req, res) => {
    res.render('agendamento.ejs');
});

db.connect(err => {
    if (err) {
        console.error('Erro na conexão com o banco de dados: ' + err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida');
});

// Rota para a página de agendamento
app.get('/teladeagenda', (req, res) => {
    console.log("/teladeagenda");
    res.sendFile(__dirname + './Tela de agenda.html');
});
app.get('/agendar',(req,res)=>{
    res.render('agendar');
    ///esse agendar esta dentro do views
})
// Rota para lidar com o agendamento
app.post('/agendar', (req, res) => {
    console.log(req.body);
    const { data, horario, especialidade } = req.body;
    const query = 'INSERT INTO agendamento (data, horario, especialidade) VALUES (?, ?, ?)';

    db.query(query, [data, horario, especialidade], (err, result) => {
        if (err) {
            console.error('Erro ao agendar consulta: ' + err);
            res.status(500).send('Erro ao agendar consulta.');
        } else {
            console.log('Consulta agendada com sucesso');
            res.redirect('/agendar');
        }


      
    });
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/Tela Consulta.html')
})
app.listen(port, () => {
    console.log(`Servidor Node.js está executando na porta ${port}`);
});
