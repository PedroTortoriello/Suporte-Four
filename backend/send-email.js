const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5173; // Porta do seu servidor backend

app.use(bodyParser.json());

// Configurar o nodemailer com suas credenciais de e-mail
const transporter = nodemailer.createTransport({
  service: 'seu_servico_de_email',
  auth: {
    user: 'seu_email@example.com',
    pass: 'sua_senha_de_email'
  }
});

// Rota para lidar com a requisição POST do frontend
app.post('backend/send-email', (req, res) => {
  // Aqui você pode acessar os dados enviados pelo frontend em req.body
  console.log(req.body);

  // Dados do formulário
  const { name, email, sistema, question, codigo } = req.body;

  // Configurações do e-mail
  const mailOptions = {
    from: 'seu_email@example.com',
    to: 'pedrooofreitas@gmail.com',
    subject: 'Nova dúvida enviada',
    text: `Nova dúvida:\n\nNome: ${name}\nEmpresa: ${email}\nSistema: ${sistema}\nDúvida: ${question}\nCódigo: ${codigo}`
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).send('Erro ao enviar e-mail');
    } else {
      console.log('E-mail enviado:', info.response);
      res.status(200).send('Dados recebidos com sucesso e e-mail enviado.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend está rodando na porta ${PORT}`);
});
