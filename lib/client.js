var util = require('util'),
    requestRoot = require('request'),
    request = requestRoot,
    _ = require('lodash'),
    defaultConfig = {
        apiKey: null,
        apiSecret: null,
        apiUrl: 'https://api.realtimecat.com',
        endpoints: {
            createSession: '/v0.1/sessions',
            getToken: '/v0.1/tokens'
        },
        request: {
            timeout: 20000 // 20 seconds
        }
    };

var Client = function (c) {
    this.c = {};
    this.config(_.defaults(c, defaultConfig));
};

Client.prototype.config = function (c) {
    _.merge(this.c, c);

    if ("request" in this.c) {
        request = requestRoot.defaults(this.c.request);
    }

    return this.c;
};

Client.prototype.createSession = function (opts, cb) {
    request.post({
        url: this.c.apiUrl + this.c.endpoints.createSession,
        form: opts,
        headers: {
            'X-RTCAT-APIKEY': this.c.apiKey,
            'X-RTCAT-SECRET': this.c.apiSecret
        }
    }, function (err, resp, body) {
        if (err) return cb(new Error('The request failed: ' + err));

        // handle client errors
        if (resp.statusCode === 403) {
            return cb(new Error('An authentication error occurred: (' + resp.statusCode + ') ' + body));
        }

        // handle server errors
        if (resp.statusCode >= 500 && resp.statusCode <= 599) {
            return cb(new Error('A server error occurred: (' + resp.statusCode + ') ' + body));
        }

        var response = JSON.parse(body);
        cb(null, response);
    });
};

Client.prototype.getToken = function (opts, cb) {
    request.post({
        url: this.c.apiUrl + this.c.endpoints.getToken,
        form: opts,
        headers: {
            'X-RTCAT-APIKEY': this.c.apiKey,
            'X-RTCAT-SECRET': this.c.apiSecret
        }
    }, function (err, resp, body) {
        if (err) return cb(new Error('The request failed: ' + err));

        // handle client errors
        if (resp.statusCode === 403) {
            return cb(new Error('An authentication error occurred: (' + resp.statusCode + ') ' + body));
        }

        // handle server errors
        if (resp.statusCode >= 500 && resp.statusCode <= 599) {
            return cb(new Error('A server error occurred: (' + resp.statusCode + ') ' + body));
        }

        var response = JSON.parse(body);
        cb(null, response);
    });
};

module.exports = Client;