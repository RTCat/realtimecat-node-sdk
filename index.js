"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

/**
 * RealTimeCat Client
 */

var Client = function () {

    /**
     * Constructor
     * @param apiKey
     * @param apiSecret
     */

    function Client(apiKey, apiSecret) {
        _classCallCheck(this, Client);

        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空');
        } else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空');
        }
        this.version = '0.2.0';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        //this.apiUrl = 'https://api.realtimecat.com/';
        this.apiUrl = 'http://127.0.0.1:8000';
        this.endpoints = {
            info: '/v0.2/',
            sessions: '/v0.2/sessions',
            permanentSessions: '/v0.2/sessions/persistent',
            temporarySessions: '/v0.2/sessions/nonpersistent',
            session: '/v0.2/session/',
            tokens: '/v0.2/sessions/{session_id}/tokens',
            permanentTokens: '/v0.2/sessions/{session_id}/tokens/persistent',
            temporaryTokens: '/v0.2/sessions/{session_id}/tokens/nonpersistent',
            token: '/v0.2/token/',
            records: '/v0.2/records',
            record: '/v0.2/record/',
            sessionslogs: '/v0.2/logs/sessions',
            tokenslogs: '/v0.2/logs/tokens',
            tokenlogs: '/v0.2/logs/session/',
            configurations: '/v0.2/configurations'
        };
    }

    /**
     * Get api basic info
     * @param cb
     */

    _createClass(Client, [{
        key: 'info',
        value: function info(cb) {
            request({
                url: this.apiUrl + this.endpoints.info
            }, function (err, resp, body) {
                if (err) return cb(new Error('请求失败: ' + err));
                // handle server errors
                if (resp.statusCode >= 500 && resp.statusCode <= 599) {
                    return cb(new Error('服务器内部错误: (' + resp.statusCode + ') ' + body));
                }
                var response = JSON.parse(body);
                return cb(null, response);
            });
        }

        /**
         * Create a session
         * @param label
         * @param data
         * @param live_days
         * @param type = p2p | rel
         * @param persistent
         * @param cb
         */

    }, {
        key: 'createSession',
        value: function createSession() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var label = _ref.label;
            var data = _ref.data;
            var live_days = _ref.live_days;
            var _ref$type = _ref.type;
            var type = _ref$type === undefined ? 'p2p' : _ref$type;
            var _ref$persistent = _ref.persistent;
            var persistent = _ref$persistent === undefined ? false : _ref$persistent;
            var cb = arguments[1];

            var opts = {
                label: label,
                data: data,
                live_days: live_days,
                type: type,
                persistent: persistent
            };
            request.post({
                url: this.apiUrl + this.endpoints.sessions,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query sessions
         * @param cb
         */

    }, {
        key: 'sessions',
        value: function sessions(cb) {
            request({
                url: this.apiUrl + this.endpoints.sessions,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query permanent sessions
         * @param cb
         */

    }, {
        key: 'permanentSessions',
        value: function permanentSessions(cb) {
            request({
                url: this.apiUrl + this.endpoints.permanentSessions,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query temporary sessions
         * @param cb
         */

    }, {
        key: 'temporarySessions',
        value: function temporarySessions(cb) {
            request({
                url: this.apiUrl + this.endpoints.temporarySessions,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Get a specific session
         * @param session_id
         * @param cb
         */

    }, {
        key: 'session',
        value: function session(session_id, cb) {
            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request({
                url: this.apiUrl + this.endpoints.session + session_id,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Update a session
         * @param session_id
         * @param label
         * @param persistent
         * @param data
         * @param live_days
         * @param cb
         */

    }, {
        key: 'updateSession',
        value: function updateSession() {
            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var session_id = _ref2.session_id;
            var label = _ref2.label;
            var persistent = _ref2.persistent;
            var data = _ref2.data;
            var live_days = _ref2.live_days;
            var cb = arguments[1];

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            var opts = {
                session_id: session_id,
                label: label,
                persistent: persistent,
                data: data,
                live_days: live_days
            };
            request.patch({
                url: this.apiUrl + this.endpoints.session + session_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Delete a session
         * @param session_id
         * @param cb
         */

    }, {
        key: 'delSession',
        value: function delSession(session_id, cb) {
            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request.del({
                url: this.apiUrl + this.endpoints.session + session_id,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                if (body) {
                    var response = JSON.parse(body);
                    // handle response errors
                    if (response.error) {
                        return cb(new Error(response.error + ': ' + response.description));
                    }
                }

                cb(null, { status: "delete successfully" });
            });
        }

        /**
         * Create a token
         * @param session_id
         * @param label
         * @param data
         * @param live_days
         * @param type = 'pub' | 'sub'
         * @param persistent = true | false
         * @param cb
         */

    }, {
        key: 'createToken',
        value: function createToken() {
            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var session_id = _ref3.session_id;
            var label = _ref3.label;
            var data = _ref3.data;
            var live_days = _ref3.live_days;
            var _ref3$type = _ref3.type;
            var type = _ref3$type === undefined ? 'pub' : _ref3$type;
            var _ref3$persistent = _ref3.persistent;
            var persistent = _ref3$persistent === undefined ? false : _ref3$persistent;
            var cb = arguments[1];

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            var opts = {
                session_id: session_id,
                label: label,
                data: data,
                live_days: live_days,
                type: type,
                persistent: persistent
            };
            request.post({
                url: this.apiUrl + this.endpoints.tokens.replace('{session_id}', session_id),
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query tokens
         * @param session_id
         * @param cb
         */

    }, {
        key: 'tokens',
        value: function tokens(session_id, cb) {
            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request({
                url: this.apiUrl + this.endpoints.tokens.replace('{session_id}', session_id),
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query permanent tokens
         * @param session_id
         * @param cb
         */

    }, {
        key: 'permanentTokens',
        value: function permanentTokens(session_id, cb) {
            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request({
                url: this.apiUrl + this.endpoints.permanentTokens.replace('{session_id}', session_id),
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query temporary tokens
         * @param session_id
         * @param cb
         */

    }, {
        key: 'temporaryTokens',
        value: function temporaryTokens(session_id, cb) {
            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request({
                url: this.apiUrl + this.endpoints.temporaryTokens.replace('{session_id}', session_id),
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Get a token
         * @param token_id
         * @param cb
         */

    }, {
        key: 'token',
        value: function token(token_id, cb) {
            if (typeof token_id === 'undefined') {
                throw new Error('Token Id is required');
            }
            request({
                url: this.apiUrl + this.endpoints.token + token_id,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Update a token
         * @param token_id
         * @param label
         * @param persistent
         * @param data
         * @param live_days
         * @param cb
         */

    }, {
        key: 'updateToken',
        value: function updateToken() {
            var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var token_id = _ref4.token_id;
            var label = _ref4.label;
            var persistent = _ref4.persistent;
            var data = _ref4.data;
            var live_days = _ref4.live_days;
            var cb = arguments[1];

            if (typeof token_id === 'undefined') {
                throw new Error('Token Id is required');
            }
            var opts = {
                token_id: token_id,
                label: label,
                persistent: persistent,
                data: data,
                live_days: live_days
            };
            request.patch({
                url: this.apiUrl + this.endpoints.token + token_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }
    }, {
        key: 'delToken',
        value: function delToken(token_id, cb) {
            if (typeof token_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            request.del({
                url: this.apiUrl + this.endpoints.token + token_id,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
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

                if (body) {
                    var response = JSON.parse(body);
                    // handle response errors
                    if (response.error) {
                        return cb(new Error(response.error + ': ' + response.description));
                    }
                }

                cb(null, { status: "delete successfully" });
            });
        }
    }]);

    return Client;
}();

module.exports = Client;
//# sourceMappingURL=index.js.map
