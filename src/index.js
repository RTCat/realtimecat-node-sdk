"use strict";

const request = require('request');

/**
 * RealTimeCat Client
 */
class Client {

    /**
     * Constructor
     * @param apiKey
     * @param apiSecret
     */
    constructor(apiKey, apiSecret) {
        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空')
        }
        else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空')
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
        }
    }

    /**
     * Get api basic info
     * @param cb
     */
    info(cb) {
        request({
            url: this.apiUrl + this.endpoints.info
        }, function (err, resp, body) {
            if (err) return cb(new Error('请求失败: ' + err));
            // handle server errors
            if (resp.statusCode >= 500 && resp.statusCode <= 599) {
                return cb(new Error('服务器内部错误: (' + resp.statusCode + ') ' + body));
            }
            let response = JSON.parse(body);
            return cb(null, response);
        })
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
    createSession({label, data, live_days,type='p2p', persistent=false}={}, cb) {
        let opts = {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });

    }

    /**
     * Query sessions
     * @param cb
     */
    sessions(cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query permanent sessions
     * @param cb
     */
    permanentSessions(cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query temporary sessions
     * @param cb
     */
    temporarySessions(cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Get a specific session
     * @param session_id
     * @param cb
     */
    session(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
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
    updateSession({session_id, label, persistent, data, live_days}={}, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        let opts = {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Delete a session
     * @param session_id
     * @param cb
     */
    delSession(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
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
                let response = JSON.parse(body);
                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }
            }

            cb(null, {status: "delete successfully"});
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
    createToken({session_id,label,data,live_days, type='pub',persistent=false}={}, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        let opts = {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });

    }

    /**
     * Query tokens
     * @param session_id
     * @param cb
     */
    tokens(session_id, cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query permanent tokens
     * @param session_id
     * @param cb
     */
    permanentTokens(session_id, cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query temporary tokens
     * @param session_id
     * @param cb
     */
    temporaryTokens(session_id, cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Get a token
     * @param token_id
     * @param cb
     */
    token(token_id, cb){
        if (typeof token_id === 'undefined') {
            throw new Error('Token Id is required')
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
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
    updateToken({token_id, label, persistent, data, live_days}={}, cb) {
        if (typeof token_id === 'undefined') {
            throw new Error('Token Id is required')
        }
        let opts = {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    delToken(token_id, cb) {
        if (typeof token_id === 'undefined') {
            throw new Error('Session Id is required')
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
                let response = JSON.parse(body);
                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }
            }

            cb(null, {status: "delete successfully"});
        });
    }

}

module.exports = Client;