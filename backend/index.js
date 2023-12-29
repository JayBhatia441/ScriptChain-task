

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql")
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


//My SQL connection with the local machine
const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"users",
});

// setting up nodemailer and Mailgun to send emails from a temporary email address
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false, 
    auth: {
        user: 'postmaster@sandbox19ea5b4a979e4b3e81554b4b1170b9e3.mailgun.org', 
        pass: '6fde32be03b63db76f4624e287bc2743-1900dca6-e1ac700b' 
    }
});

// setting up email content and sending email to the user entered email address
function sendConfirmationEmail(name, email) {
    const mailOptions = {
        from: 'postmaster@sandbox19ea5b4a979e4b3e81554b4b1170b9e3.mailgun.org',
        to: email,
        subject: 'Email Confirmation',
        html: `<p>Hi ${name},</p><p>Thank you for your registration. Your email address is ${email}.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// endpoint to handle the user form submission

app.post('/submit', (req, res) => {
    const { username, email } = req.body;

    // check if email already exists in the database
    
    db.query('SELECT * FROM user_info WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error while checking email');
        }

        if (result.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

    // if not then store the username and email in the database
        db.query(
            'INSERT INTO user_info (user_name, email) VALUES (?, ?)',
            [username, email],
            (insertErr, insertResult) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.status(500).send('Error while inserting data');
                }
                console.log(`Data inserted with ID: ${insertResult.insertId}`);

                // send email confirmation
                
                sendConfirmationEmail(username, email);
                res.status(200).json({ message: 'Form data received and stored in database', id: insertResult.insertId });
            }
        );
    });
    
    
});




app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
