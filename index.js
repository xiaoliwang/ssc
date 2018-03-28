'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
const { sender, receivers, config_path } = require('./config');
const { generatePasswords } = require('./lib');
const { exec } = require('child_process');

let config = generatePasswords();

fs.writeFileSync(config_path, JSON.stringify(config, null, 4));

let transporter = nodemailer.createTransport(sender);

for (let receiver in receivers) {
    let email = receivers[receiver];
    let port = config._comment[receiver];
    let password = config.port_password[port];
    let method = config.method;
    let text = { port, password, method };
    sendEmail(email, JSON.stringify(text, null, 4));
}

exec(`ssserver -c ${config_path} -d restart`);

function sendEmail(email, text) { 
    let mailOptions = {
        from: `"Admin 👻" ${sender.auth.user}`,
        to: email,
        subject: 'Your Password ✔', // Subject line
        text: text, // plain text body
        html: `<b>${text}</b>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}