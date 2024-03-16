const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user.js");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(
    "mongodb+srv://bsse1321:Abir123@restapi.nkqy7wr.mongodb.net/SPL-II?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend Running At Port 5000`);
    });
    console.log("DB Connected.");
  })
  .catch((err) => {
    console.error("DB Err.", err);
  });

app.post("/signup", userController.signup);
app.post("/signin", userController.signin);
app.post("/submit-otp", userController.submitotp);
app.post("/send-otp", userController.sendotp);
app.post("/upload-pdf", userController.uploadPdf);
