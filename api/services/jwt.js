var crypto = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');


exports.createSendToken = function (user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(2, 'days').unix()
    };

    var token = jwt.encode(payload, "shhh...");

    res.status(200).send({
        user: user.toJSON(),
        token: token
    });

};

exports.encode = function (payload, secret) {
    var algorithm = 'HS256';

    var header = {
        typ: 'JWT',
        alg: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
    return jwt + '.' + sign(jwt, secret);

}
exports.decode = function (token, secret) {
    var seg = token.split('.');
    if (seg.length !== 3)
        throw new Error('Token structure incorrect')

    var header = JSON.parse(base64Decode(seg[0]));
    var payload = JSON.parse(base64Decode(seg[1]));

    var rawSignature = seg[0] + '.' + seg[1];

    if (!verify(rawSignature, secret, seg[2]))
        throw new Error('Verification Failed!');

    return payload;
}

function verify(rawSignature, secret, signature) {
    return signature === sign(rawSignature, secret);
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str) {
    return new Buffer(str).toString('base64');
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}
