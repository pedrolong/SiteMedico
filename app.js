//
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); 

const app = express();
const port = 3010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname)); // Serve arquivos estáticos na pasta atual (onde está sua página de agendamento)
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: false }));

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'Medical'
});


// Configure a view engine (EJS in this case)
app.set('view engine', 'ejs');

// Definindo Index como página principal
app.get('/', (req, res) => {
    res.render('index');
    app.use(express.static(__dirname + '/views'));
    app.use(express.static(__dirname + '/'));
});

// Render the agendamento.ejs view
app.get('/agendamento', (req, res) => {
    res.render('agendamento.ejs');
});

db.connect(err => {
    if (err) {
        console.error('Erro na conexão com o banco de dados: ' + err);
        return;
    }
    console.log('Conectado com o banco de dados 1 MySQL');
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
    host: '10.144.166.48',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'cadastros_medical_group',
});

newDb.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err);
    } else {
        console.log('Conectado ao banco de dados 2 MySQL');
    }
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Certifique-se de que você tenha um arquivo de modelo 'cadastro.ejs' definido
});

app.post('/cadastro', async (req, res) => {
    const { username, password, email, cpf, numero_telefone, data_nascimento, tipo } = req.body;

    // Verificar se o email, telefone ou CPF já existem no banco de dados
    const checkDuplicateQuery = 'SELECT * FROM cadastro WHERE email = ? OR numero_telefone = ? OR cpf = ?';
    newDb.query(checkDuplicateQuery, [email, numero_telefone, cpf], (err, result) => {
        if (err) {
            res.status(500).send('Erro no servidor ao verificar dados duplicados');
        } else if (result.length > 0) {
            // Dados duplicados encontrados, determine qual dado está duplicado
            const duplicateFields = [];
            result.forEach((row) => {
                if (row.email === email) duplicateFields.push('E-mail');
                if (row.numero_telefone === numero_telefone) duplicateFields.push('Número de Telefone');
                if (row.cpf === cpf) duplicateFields.push('CPF');
            });

            // Construa a mensagem de erro informando quais dados estão duplicados
            const errorMessage = `Esse ${duplicateFields.join(', ')} já foi cadastrado. verifique suas informações.`;

            // Envie a mensagem de erro para o cliente
            res.render('cadastro', { error: errorMessage, layout: 'layouts/layout' });
        } else {
            // Prossiga com a inserção dos dados no banco de dados
            const cadastroQuery = 'INSERT INTO cadastro (username, password, email, cpf, numero_telefone, data_nascimento, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            newDb.query(cadastroQuery, [username, password, email, cpf, numero_telefone, data_nascimento, tipo], (err, result) => {
                if (err) {
                    res.status(500).send('Erro no servidor ao cadastrar');
                } else {
                    const user_id = result.insertId;

                    // Consulta para inserir na tabela de login relacionada ao ID do usuário
                    const loginQuery = 'INSERT INTO login (user_id, last_login) VALUES (?, NOW())';
                    newDb.query(loginQuery, [user_id], (err, result) => {
                        if (err) {
                            res.status(500).send('Erro no servidor ao criar login');
                        } else {
                            res.redirect('/login');
                            app.use(express.static(__dirname + '/'));
                        }
                    });
                }
            });
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login'); // Certifique-se de que você tenha um arquivo de modelo 'login.ejs' definido
});
app.post('/login', (req, res) => {
    const { email, password, tipo } = req.body;

    // Consulta para buscar o ID do usuário com base no nome de usuário e senha
    const loginQuery = 'SELECT user_id, tipo FROM cadastro WHERE email = ? AND password = ? AND tipo = ?';
    newDb.query(loginQuery, [email, password, tipo], (err, result) => {
        if (err) {
            res.status(500).send('Erro no servidor ao fazer login');
        } else if (result.length > 0) {
            const user_id = result[0].user_id;
            const user_tipo = result[0].tipo;
            const usuario = results[0];
            req.session.loggedin = true;
            req.session.usertype = 'Paciente';

            // Consulta para obter informações de login com base no ID do usuário
            const userInfoQuery = 'SELECT * FROM login WHERE user_id = ?';
            newDb.query(userInfoQuery, [user_id], (err, result) => {
                if (err) {
                    res.status(500).send('Erro no servidor ao buscar informações de login');
                } else {
                    // Você pode acessar os dados de login como result[0].last_login

                    // Adicione redirecionamentos com base no tipo de usuário
                    if (user_tipo === 'medico') {
                        res.redirect('/teladomedico');
                    } else if (user_tipo === 'paciente') {
                        res.redirect('/TelaPaciente');
                    }
                }
            });
        } else {
            res.render('login', { error: 'Email ou senha incorretos' });
        }
    });
});

// Adicione rotas para cada tipo de usuário
app.get('/teladomedico', (req, res) => {
    res.render('teladomedico');
    app.use(express.static(__dirname + '/views'));
});

app.get('/TelaPaciente', (req, res) => {
    res.render('TelaPaciente');
    app.use(express.static(__dirname + '/views'));
});


app.get('/Teladeagendamento', (req, res) => {
    res.render('Teladeagendamento');
    app.use(express.static(__dirname + '/views')); // Certifique-se de que você tenha um arquivo de modelo 'login.ejs' definido
});

app.post('/Teladeagendamento', (req, res) => {
    const { data, horario, especialidade } = req.body;

    const query = 'INSERT INTO agendamento (data, horario, especialidade) VALUES (?, ?, ?)';

    db.query(query, [data, horario, especialidade], (err, result) => {
        if (err) {
            console.error('Erro ao agendar a consulta', err);
            res.send('Erro ao agendar a consulta <a href="/Teladeagendamento"> Voltar para a página de agendamento</a>.');
        } else {
            res.render('Teladeagendamento');
        }
    });
});

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/Images'));


app.listen(port, () => {
    console.log(`Servidor Node.js está executando na porta ${port}`);
});

app.get('/index', (req, res) => {
    res.render('index'); // Certifique-se de que você tenha um arquivo de modelo 'cadastro.ejs' definido
    app.use(express.static(__dirname + '/views'));
});

/* app.get('/teladomedico', (req, res) => {
    const query = 'SELECT * FROM agendamento';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao buscar agendamentos: ' + err);
            res.status(500).send('Erro ao buscar agendamentos.');
        } else {
            const cb = 'SELECT data AND horario AND especialidade FROM agendamento';
            db.query(cb,(err,rows)=>{
            res.render('teladomedico', { data: rows })});
        }
    });
}); */
app.get('/teladomedico2', (req,res) =>{
    const query = 'SELECT data, horario, especialidade FROM agendamento';
    db.query(query, (err, rows) => {

        if(err)throw err;
            res.render('medico', {data:rows});
        
    });
})
