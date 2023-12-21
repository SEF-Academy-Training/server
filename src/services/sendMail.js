const nodemailer = require("nodemailer"); 
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { 
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMailFun = async (userName, userEmail, title, subject, message) => {
  try {
    await transporter.sendMail({
      from: {
        name: 'Tax Hub',
        address: process.env.USER,
      },  
      to: ['rwanabdelfattah301@gmail.com'], 
      subject: subject,  
      text: title,  
      html: `user ${userName} user email ${userEmail} <b>${message}</b>`,  
      attachments: [],
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = sendMailFun;

// const mailOptions = {
//   from: {
//     name: 'Tax Hub',
//     address:process.env.USER

//   },  
//   to: ['rwanabdelfattah301@gmail.com'], 
//   subject: "Hello ✔",  
//   text: "Hello world?",  
//   html: "<b>Hello world?</b>",  
//   attachments:[
//     {
//       filename : 'test.pdf' , 
//       path : path.join(__dirname, 'test.pdf'),
//       contentType:'application/pdf'
//     },
//     {
//       filename : 'test.png' , 
//       path : path.join(__dirname, 'test.png'),
//       contentType:'image/pdf'
//     }
//   ], 
// }

// sendMailFun(transporter, mailOptions)