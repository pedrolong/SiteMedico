const express = require('express');
const mysql = require('mysql2');
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
app.get('/agendar', (req, res) => {
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

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const newDb = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'cadastros_medical_group',
});

newDb.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Certifique-se de que você tenha um arquivo de modelo 'cadastro.ejs' definido
});

app.post('/cadastro', (req, res) => {
    const { username, password, email, cpf, numero_telefone, data_nascimento, tipo } = req.body;

    // Consulta para inserir na tabela de cadastro
    const cadastroQuery = 'INSERT INTO cadastro (username, password, email, cpf, numero_telefone, data_nascimento, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    newDb.query(cadastroQuery, [username, password, email, cpf, numero_telefone, data_nascimento, tipo], (err, result) => {
        if (err) {
            res.status(500).send('Erro no servidor ao cadastrar');
        } else {
            const user_id = result.insertId; // Obtém o ID do usuário inserido

            // Consulta para inserir na tabela de login relacionada ao ID do usuário
            const loginQuery = 'INSERT INTO login (user_id, last_login) VALUES (?, NOW())';
            newDb.query(loginQuery, [user_id], (err, result) => {
                if (err) {
                    res.status(500).send('Erro no servidor ao criar login');
                } else {
                    res.send('Cadastro e login realizados com sucesso');
                }
            });
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login'); // Certifique-se de que você tenha um arquivo de modelo 'login.ejs' definido
});

app.post('/login', (req, res) => {
    const { username, password, tipo } = req.body;

    // Consulta para buscar o ID do usuário com base no nome de usuário e senha
    const loginQuery = 'SELECT user_id FROM cadastro WHERE username = ? AND password = ? AND tipo = ?';
    newDb.query(loginQuery, [username, password, tipo], (err, result) => {
        if (err) {
            res.status(500).send('Erro no servidor ao fazer login');
        } else if (result.length > 0) {
            const user_id = result[0].user_id;

            // Consulta para obter informações de login com base no ID do usuário
            const userInfoQuery = 'SELECT * FROM login WHERE user_id = ?';
            newDb.query(userInfoQuery, [user_id], (err, result) => {
                if (err) {
                    res.status(500).send('Erro no servidor ao buscar informações de login');
                } else {
                    // Você pode acessar os dados de login como result[0].last_login
                    res.send('Login bem-sucedido');
                }
            });
        } else {
            res.send('Nome de usuário ou senha incorretos');
        }
    });
});



app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/Images'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Tela Consulta.html')
})
app.listen(port, () => {
    console.log(`Servidor Node.js está executando na porta ${port}`);
});
