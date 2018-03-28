let sender = {
    host: 's',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '', // generated ethereal user
        pass: '' // generated ethereal password
    }
};

let receivers = {};

let config_path = '';

exports.sender = sender;
exports.receivers = receivers;
exports.config_path = config_path;