/**
 * Created by 35376 on 11/2/2015.
 */

var jwt = require('jwt-simple');

module.exports = function(req, res) {
    if(!req.headers.authorization){
        return res.status(401).send({
            message: 'You are not authorized.'
        });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'shhh...');

    if(!payload.sub) {
        res.status(401).send({
            message: 'Authentication Failed!'
        });
    }
    res.json(jobs);
};

var jobs = [
    'Cook',
    'Super Hero',
    'Unicorn Whisperer',
    'Toast Inspector'
];