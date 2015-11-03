/**
 * Created by 35376 on 11/2/2015.
 */

var config = require('../config');

module.exports = function(res, req) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
        client_id: req.body.clientId,
        redirect_url: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    }


}