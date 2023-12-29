

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql")
const port = 3000;

app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"users",
});


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

app.post('/submit', (req, res) => {
    const { username, email } = req.body;

    db.query('SELECT * FROM user_info WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error while checking email');
        }

        if (result.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }


        db.query(
            'INSERT INTO user_info (user_name, email) VALUES (?, ?)',
            [username, email],
            (insertErr, insertResult) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.status(500).send('Error while inserting data');
                }
                console.log(`Data inserted with ID: ${insertResult.insertId}`);
                sendConfirmationEmail(username, email);
                res.status(200).json({ message: 'Form data received and stored in database', id: insertResult.insertId });
            }
        );
    });
    
    
});

app.get('/get-users', (req, res) => {
    db.query('SELECT * FROM user_info', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while fetching data');
        } else {
            res.status(200).json(result);
        }
    });
})





app.get("/", (req, res) => {
  res.send("Hello World!Ae javadiya ailaaa");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
