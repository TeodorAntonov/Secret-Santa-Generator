const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000; //this is example port 3000. You can change it whatever port you want!

const user = 'user_email_@example.com'; // Put your santa claus e-mail here!
const pass = 'your_credential_password'; // Put your santa claus e-mail password here!

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST endpoint for sending emails
app.post('/send-email', (req, res) => {
  console.log(req.body);
  console.log(res);

  const { to, subject, body } = req.body;

  // Nodemailer configuration (adjust with your SMTP settings)
  const transporter = nodemailer.createTransport({
    host: 'your_smtp_host', //'smtp.gmail.com'
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  // Email options
  const mailOptions = {
    from: user,
    to: to,
    subject: subject,
    text: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }

    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

app.use((req, res, next) => { 
  res.status(404).send( 
      "<h1>Page not found on the server</h1>") 
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
