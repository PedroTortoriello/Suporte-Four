const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3033;
const mongoURI = 'mongodb+srv://Pedro:brRJZ5Tb6H2BkbmT@cluster0.k7aaoi5.mongodb.net';

// Conexão com o MongoDB
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}

connectToDatabase();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// Rota de autenticação
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe no banco de dados
    const db = client.db('RSVP');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Se as credenciais estiverem corretas, você pode retornar um token JWT ou uma mensagem de sucesso
    const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
    res.json({ token }); // Retornar o token JWT

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

