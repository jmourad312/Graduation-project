const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dreksyonyteam@gmail.com',
    pass: 'dreksyony47910'
  }
});

module.exports = transporter;