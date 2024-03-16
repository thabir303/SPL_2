const UserModel = require("../models/user");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');

//https://postman-echo.com/post
//http://localhost:5000/signin

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') 
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@(iit\.du\.ac\.bd|du\.ac\.bd)$/;
    return emailRegex.test(email);
};


const sendVerificationEmail = async (email, verificationLink) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        let info = await transporter.sendMail({
            from: "tanvirhasanabir8@gmail.com",
            to: email, 
            subject: "Account Verification", 
            html: `<html><body><p>Please click the following link to verify your account: <a href="${verificationLink}">${verificationLink}</a></p></body></html>`,
        });

        console.log("Verification email sent: ", info.messageId);
    } catch (error) {
        console.error("Error sending verification email: ", error);
    }
};

module.exports.signup = async (req, res) => {
    console.log(req.body);

    try {
        
        if (!isValidEmail(req.body.email)) {
            res.send({ code: 400, message: "Invalid email address" });
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); 

        const newUser = new UserModel({
            email: req.body.email,
            password: hashedPassword, 
        });

        await newUser.save();

        const verificationLink = 'https://yourdomain.com/verify?token=abc123';

       
        await sendVerificationEmail(req.body.email, verificationLink);

        res.send({ code: 200, message: "Signup success" });
    } catch (err) {
        res.send({ code: 500, message: "Signup Err" });
    }
};


module.exports.signin = async (req, res) => {
    console.log(req.body.email);

    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            res.send({ code: 404, message: "User not found" });
            return;
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            res.send({ code: 404, message: "Password wrong" });
            return;
        }

        res.send({
            email: user.email,
            code: 200,
            message: "User Found",
        });
    } catch (err) {
        res.send({ code: 500, message: `Error: ${err.message}` });
    }
};

module.exports.sendotp = async (req, res) => {
    console.log(req.body);
    const _otp = Math.floor(100000 + Math.random() * 900000);
    console.log(_otp);
    let user = await UserModel.findOne({ email: req.body.email });
    
    if (!user) {
        res.send({ code: 500, message: `${user} not found` });
    }

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: "tanvirhasanabir8@gmail.com",
        to: req.body.email, 
        subject: "OTP", 
        text: String(_otp),
        html: `<html><body><p>Hello and welcome</p></body></html>`,
    });

    if (info.messageId) {
        console.log(info, 1321);
        UserModel.updateOne({ email: req.body.email }, { otp: _otp })
        .then((result) => {
            res.send({ code: 200, message: "OTP Send" });
        })
        .catch((err) => {
            res.send({ code: 500, message: "Server Error" });
        });
    } else {
        res.send({ code: 500, message: "Server Error" });
    }
};

module.exports.submitotp = (req, res) => {
    console.log(req.body);

    UserModel.findOne({ otp: req.body.otp })
    .then((result) => {
       

        UserModel.updateOne(
            { email: result.email },
            { password: req.body.password }
        )
        .then((result) => {
            res.send({ code: 200, message: "Password updated" });
        })
        .catch((err) => {
            res.send({ code: 500, message: "Server err" });
        });
    })
    .catch((err) => {
        res.send({ code: 500, message: "OTP is wrong" });
    });
};

module.exports.uploadPdf = async (req, res) => {
  upload.single('pdfFile')(req, res, async (err) => {
      if (err) {
          return res.status(500).json({ message: "Error uploading file." });
      }

      if (!req.file) {
          return res.status(400).json({ message: "Please upload a PDF file." });
      }

      try {
          const pdfData = await pdfParse(req.file.path);
          console.log("PDF Content: ", pdfData.text);

          
          fs.unlinkSync(req.file.path);

          res.send({ message: "PDF processed successfully.", content: pdfData.text });
      } catch (error) {
          console.error("Error processing PDF: ", error);
          res.status(500).send({ message: "Error processing PDF." });
      }
  });
};