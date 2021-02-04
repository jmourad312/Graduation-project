const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dreksyonyteam@gmail.com',
    pass: 'dreksyony47910'
  }
});

module.exports = transporter;



  // auth: {
  //     user: 'jaime.wehner49@ethereal.email',
  //     pass: 'XeRnvJgG42XucmvUXd'
  // }
