const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onibusca'
});


app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome ||!email ||!senha) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    return;
  }

  try {
    const [result] = await db.execute('SELECT * FROM users WHERE email =?', [email]);
    if (result.length > 0) {
      res.status(400).json({ message: 'Este e-mail já está em uso' });
      return;
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const [results] = await db.execute('INSERT INTO users (nome, email, senha) VALUES(?,?,?)', [nome, email, hashedPassword]);
    res.status(201).json({ message: 'Usuário cadastrado!', id: results.insertId });
  } catch (err) {
    res.status(500).json({ message: `Erro ao cadastrar: ${err.message}` });
    console.log(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(400).json({ message: 'Email e senha são obrigatórios' });
    return;
  }

  try {
    const [results] = await db.execute('SELECT * FROM users WHERE email =?', [email]);
    if (results.length > 0) {
      const isValidPassword = await bcrypt.compare(senha, results[0].senha);
      if (isValidPassword) {
        const userData = {
          id: results[0].id,
          nome: results[0].nome,
          email: results[0].email,
        };
        res.json({ message: 'Login realizado!', userData }); // Retorna userData como objeto
      } else {
        res.status(401).json({ message: 'Senha inválida' });
      }
    } else {
      res.status(401).json({ message: 'Email não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

app.get('/', (req, res) => {
  res.send('Olá')
})
app.listen(8080, () => {
  console.log("Servidor rodando!");
});