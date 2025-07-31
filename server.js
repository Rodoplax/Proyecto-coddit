
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // útil si frontend y backend están en dominios distintos

const app = express();
const port = process.env.port || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contacto', async (req, res) => {
  const { nombre, email, telefono, empresa, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CORREO_EMISOR,
      pass: process.env.CONTRASENA_APP
    }
  });

  const contenido = `
    📩 Nuevo mensaje desde la web:

    🧑 Nombre: ${nombre}
    📧 Email: ${email}
    📞 Teléfono: ${telefono}
    🏢 Empresa: ${empresa}
    📝 Mensaje: ${mensaje}
  `;

  try {
    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.CORREO_EMISOR}>`,
      to: process.env.CORREO_RECEPTOR,
      subject: `Mensaje de ${nombre} desde tu web`,
      text: contenido
    });

    res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
