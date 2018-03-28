const randomstring = require('randomstring');
const { receivers } = require('./config');

const methods = [
    "chacha20",
    "salsa20",
    "aes-256-cfb",
];

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function getRandomItem(arr) {
    let index = getRandomInt(0, arr.length);
    return arr[index];
}


function generatePasswords() {
    let ssj = {
        server: "0.0.0.0",
        timeout: 600
    };
    for (let receiver in receivers) {
        email = receivers[receiver];
        if (!ssj._comment) ssj._comment = {};
        if (!ssj.port_password) ssj.port_password = {};
        let port = getRandomInt(62000, 62999);
        ssj._comment[receiver] = port;
        if (receiver === 'yiran') {
            ssj.port_password[port] = 'miehaha233';
        } else {
            ssj.port_password[port] = randomstring.generate(32);
        }    
    }
    ssj.method = getRandomItem(methods);
    ssj.workers = Object.keys(receivers).length
    return ssj
}

exports.generatePasswords = generatePasswords;