require('dotenv').config(); 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "scripts")));
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.send('hey')
});

app.post('/submit-form', (req, res) => {
    const { name, phone, email, service, notes } = req.body;

    // Log the form data
    console.log('Form data received:');
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Service: ${service}`);
    console.log(`Additional Notes: ${notes}`);

    // Create a transporter for Nodemailer to send email
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail
        auth: {
            user: process.env.EMAIL_USER, // From .env file
            pass: process.env.EMAIL_PASS, // From .env file
        },
    });

    // Set up email details
    const mailOptions = {
        from: email, // The sender’s email
        to: 'rohanunbeg0918@gmail.com', // The email where the form submissions will be sent
        subject: `New Service Request from ${name}`,
        text: `
            Name: ${name}
            Phone: ${phone}
            Email: ${email}
            Service: ${service}
            Additional Notes: ${notes}
        `,
    };

    // Log the email options
    console.log('Sending email with options:', mailOptions);

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('There was an issue submitting your form. Please try again.');
        }

        console.log('Email sent successfully:', info.response);
        
       
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;  
        const client = twilio(accountSid, authToken);
        const message = `
            New service request from ${name}:
            Phone: ${phone}
            Email: ${email}
            Service: ${service}
            Notes: ${notes}
        `;

   
        const fromPhoneNumber = process.env.TWILIO_WHATSAPP_NUMBER; 
        const toPhoneNumber = process.env.RECIPIENT_WHATSAPP_NUMBER; 


        client.messages.create({
            body: message,
            from: fromPhoneNumber, // Your  WhatsApp number
            to: toPhoneNumber,     // The recipient's phone number (also with "whatsapp:" prefix)
        })
        .then(message => {
            console.log('WhatsApp message sent:', message.sid);
            res.send('Thank you for your request. We will get back to you shortly.');
        })
        .catch(error => {
            console.log('Error sending WhatsApp message:', error);
            res.status(500).send('There was an issue submitting your form. Please try again.');
        });
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
