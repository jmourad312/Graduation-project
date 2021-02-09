const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure: true,
  auth: {
    user: 'dreksyonyteam@gmail.com',
    pass: 'dreksyony47910'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;



  // auth: {
  //     user: 'jaime.wehner49@ethereal.email',
  //     pass: 'XeRnvJgG42XucmvUXd'
  // }
