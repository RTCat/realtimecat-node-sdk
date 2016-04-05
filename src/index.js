"use strict";

const request = require('request');

/**
 * RealTimeCat Client
 */
class Client {

    /**
     * Constructor
     * @param apiKey 实时猫API Key
     * @param apiSecret 实时猫API Secret
     * @param apiUrl 后端接口地址,形如https://api.realtimecat.com:443
     */
    constructor({apiKey, apiSecret, apiUrl='https://api.realtimecat.com:443'}={}) {
        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空')
        }
        else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空')
        }
        this.version = '0.3.0';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.endpoints = {
            info: '/v0.3/',
            sessions: '/v0.3/sessions',
            permanentSessions: '/v0.3/sessions/permanent',
            temporarySessions: '/v0.3/sessions/nonpermanent',
            session: '/v0.3/sessions/',
            tokens: '/v0.3/sessions/{session_id}/tokens',
            permanentTokens: '/v0.3/sessions/{session_id}/tokens/permanent',
            temporaryTokens: '/v0.3/sessions/{session_id}/tokens/nonpermanent',
            token: '/v0.3/tokens/',
            records: '/v0.3/records',
            record: '/v0.3/records/',
            sessionslogs: '/v0.3/logs/sessions',
            tokenslogs: '/v0.3/logs/tokens',
            tokenlogs: '/v0.3/logs/sessions/',
            configurations: '/v0.3/configurations'
        }
    }

    /**
     * Get API Basic Info 获取本 API 基本信息
     * @param cb 回调函数
     */
    info(cb) {
        request({
            url: this.apiUrl + this.endpoints.info
        }, function (err, resp, body) {
            if (err) return cb(new Error('请求失败: ' + err));
            let response = JSON.parse(body);
            return cb(null, response);
        })
    }

    /**
     * Create a Session 新建Session
     * @param label 可选，供开发者区分Session,长度255
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param type 类型,仅可以为p2p或rel
     * @param permanent true/false, 为true时Session永不过期
     * @param cb 回调函数
     */
    createSession({label, data, live_days, type='p2p', permanent=false}={}, cb) {
        let opts = {
            label: label,
            data: data,
            live_days: live_days,
            type: type,
            permanent: permanent
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });

    }

    /**
     * Query Sessions 获取Session列表
     * @param opts
     * @param opts.page 获取第几页
     * @param opts.page_size 按每页多少条目分页
     * @param cb 回调函数
     */
    sessions(opts, cb) {
        let url = this.apiUrl + this.endpoints.sessions;
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }
        if (opts.page && opts.page_size) {
            url += '?page=' + opts.page + '&page_size=' + opts.page_size;
        }
        else if (opts.page_size) {
            url += '?page_size=' + opts.page_size;
        }
        else if (opts.page) {
            url += '?page=' + opts.page
        }
        request({
            url: url,
            headers: {
                'X-RTCAT-APIKEY': this.apiKey,
                'X-RTCAT-SECRET': this.apiSecret
            }
        }, function (err, resp, body) {

            if (err) return cb(new Error('The request failed: ' + err));

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query Permanent Sessions 获取永久Session列表
     * @param cb 回调函数
     * TODO: 增加page和page_size参数
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query Temporary Sessions 获取临时Session列表
     * @param cb 回调函数
     * TODO: 增加page和page_size参数
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Get a Specific Session 获取单个Session
     * @param session_id Session ID
     * @param cb 回调函数
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Update a Session 修改单个Session
     * @param session_id Session ID
     * @param label 可选，供开发者区分Session,长度255
     * @param permanent true/false, 为true时Session永不过期
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param cb 回调函数
     */
    updateSession({session_id, label, permanent, data, live_days}={}, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        let opts = {
            session_id: session_id,
            label: label,
            permanent: permanent,
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Delete a Session 删除单个Session
     * @param session_id Session ID
     * @param cb 回调函数
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
     * Create a Token Under a Session 创建Session ID下的Token
     * @param session_id Session ID
     * @param label 可选，供开发者区分Token,长度255
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param type 类型,仅可以为pub或sub
     * @param permanent true/false,为true时Token永不过期
     * @param number 创建个数
     * @param cb 回调函数
     */
    createToken({session_id, label, data, live_days, type='pub', permanent=false, number=1}={}, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        let opts = {
            session_id: session_id,
            label: label,
            data: data,
            live_days: live_days,
            type: type,
            permanent: permanent,
            number: number
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });

    }

    /**
     * Query Tokens Under a Session 获取Session ID下的所有Token列表
     * @param opts
     * @param opts.session_id Session ID
     * @param opts.page 获取第几页tokens
     * @param opts.page_size 按每页多少条目分页
     * @param cb 回调函数
     */
    tokens(opts, cb) {
        if (!opts.session_id) {
            throw new Error('Session Id is required');
        }
        let url = this.apiUrl + this.endpoints.tokens.replace('{session_id}', opts.session_id);
        if (opts.page && opts.page_size) {
            url += '?page=' + opts.page + '&page_size=' + opts.page_size;
        }
        else if (opts.page_size) {
            url += '?page_size=' + opts.page_size;
        }
        else if (opts.page) {
            url += '?page=' + opts.page
        }
        request({
            url: url,
            headers: {
                'X-RTCAT-APIKEY': this.apiKey,
                'X-RTCAT-SECRET': this.apiSecret
            }
        }, function (err, resp, body) {
            if (err) return cb(new Error('The request failed: ' + err));

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query Permanent Tokens 获取永久Token列表
     * @param session_id Session ID
     * @param cb 回调函数
     * TODO: 增加page和page_size参数
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Query Temporary Tokens 获取临时Token列表
     * @param session_id Session ID
     * @param cb 回调函数
     * TODO: 增加page和page_size参数
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Get a Token 获取单个Token
     * @param token_id Token ID
     * @param cb 回调函数
     */
    token(token_id, cb) {
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Update a Token 修改单个Token
     * @param token_id Token ID
     * @param label 可选，供开发者区分Token,长度255
     * @param permanent 为true时Token永不过期
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param cb 回调函数
     */
    updateToken({token_id, label, permanent, data, live_days}={}, cb) {
        if (typeof token_id === 'undefined') {
            throw new Error('Token Id is required')
        }
        let opts = {
            token_id: token_id,
            label: label,
            permanent: permanent,
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

            let response = JSON.parse(body);

            // handle response errors
            if (response.error) {
                return cb(new Error(`${response.error}: ${response.description}`))
            }

            cb(null, response);
        });
    }

    /**
     * Delete a Token 删除单个Token
     * @param token_id Token ID
     * @param cb 回调函数
     */
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