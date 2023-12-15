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

const mailOptions = {
  from: {
    name: 'Tax Hub',
    address:process.env.USER

  },  
  to: ['rwanabdelfattah301@gmail.com'], 
  subject: "Hello ✔",  
  text: "Hello world?",  
  html: "<b>Hello world?</b>",  
  attachments:[
    {
      filename : 'test.pdf' , 
      path : path.join(__dirname, 'test.pdf'),
      contentType:'application/pdf'
    },
    {
      filename : 'test.png' , 
      path : path.join(__dirname, 'test.png'),
      contentType:'image/pdf'
    }
  ], 
}

const sendMailFun = async (transporter ,mailOptions)=>{
  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
    
  }

}
sendMailFun(transporter, mailOptions)