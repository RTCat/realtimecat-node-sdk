"use strict";

const request = require('request');

/**
 * RealTimeCat Client
 */
class RealTimeCat {

    /**
     * Constructor
     * @param apiKey 实时猫API Key
     * @param apiSecret 实时猫API Secret
     * @param apiUrl 后端接口地址,形如https://api.realtimecat.com:443
     */
    constructor({apiKey, apiSecret, apiUrl = 'https://api.realtimecat.com:443'}={}) {
        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空')
        }
        else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空')
        }
        this._version = 'v0.4';
        this._apiKey = apiKey;
        this._apiSecret = apiSecret;
        this._apiUrl = apiUrl;
        this._endpoints = {
            sessions: `/${this._version}/sessions`,
            permanentSessions: `/${this._version}/sessions/permanent`,
            temporarySessions: `/${this._version}/sessions/nonpermanent`,
            session: `/${this._version}/sessions/`,
            tokens: `/${this._version}/sessions/{session_id}/tokens`,
            permanentTokens: `/${this._version}/sessions/{session_id}/tokens/permanent`,
            temporaryTokens: `/${this._version}/sessions/{session_id}/tokens/nonpermanent`,
            token: `/${this._version}/tokens/`,
            records: `/${this._version}/records`,
            record: `/${this._version}/records/`
        }
    }

    /**
     * Create a Session 新建Session
     * @param label 可选，供开发者区分Session,长度255
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param type 类型,仅可以为p2p或rel
     * @param permanent true/false, 为true时Session永不过期
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    createSession({label, data, live_days, type = 'p2p', permanent = false}={}, cb) {
        let opts = {
            label: label,
            data: data,
            live_days: live_days,
            type: type,
            permanent: permanent
        };
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.post({
                url: this._apiUrl + this._endpoints.sessions,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error);
                } // handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Query Sessions 获取Session列表
     * @param opts
     * @param opts.page 获取第几页
     * @param opts.page_size 按每页多少条目分页
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    sessions(opts, cb) {
        if (typeof opts === 'function') {
            cb = opts;
            opts = {};
        }
        cb = cb || function () {
            };
        let url = this._apiUrl + this._endpoints.sessions;
        if (opts.page && opts.page_size) {
            url += '?page=' + opts.page + '&page_size=' + opts.page_size;
        }
        else if (opts.page_size) {
            url += '?page_size=' + opts.page_size;
        }
        else if (opts.page) {
            url += '?page=' + opts.page
        }
        return new Promise((resolve, reject) => {
            request({
                url: url,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error);
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Query Permanent Sessions 获取永久Session列表
     * @param cb 可选，回调函数
     * @returns {Promise}
     * @todo: 增加page和page_size参数
     */
    permanentSessions(cb) {
        cb = cb || function () {};
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.permanentSessions,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }


    /**
     * Query Temporary Sessions 获取临时Session列表
     * @param cb 可选，回调函数
     * @returns {Promise}
     * @todo: 增加page和page_size参数
     */
    temporarySessions(cb) {
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.temporarySessions,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Get a Specific Session 获取单个Session
     * @param session_id Session ID
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    session(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.session + session_id,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Update a Session 修改单个Session
     * @param session_id Session ID
     * @param label 可选，供开发者区分Session,长度255
     * @param permanent true/false, 为true时Session永不过期
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param cb 可选，回调函数
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
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.patch({
                url: this._apiUrl + this._endpoints.session + session_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Delete a Session 删除单个Session
     * @param session_id Session ID
     * @param cb 可选，回调函数
     */
    delSession(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.del({
                url: this._apiUrl + this._endpoints.session + session_id,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                if (body) {
                    const response = JSON.parse(body);
                    if (response.error) {
                        const error = new Error(`${response.error}: ${response.description}`);
                        reject(error);
                        return cb(error);
                    } // handle response errors
                }
                resolve({status: "delete successfully"});
                cb(null, {status: "delete successfully"});
            });
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
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    createToken({session_id, label, data, live_days, type = 'pub', permanent = false, number = 1}={}, cb) {
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
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.post({
                url: this._apiUrl + this._endpoints.tokens.replace('{session_id}', session_id),
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Query Tokens Under a Session 获取Session ID下的所有Token列表
     * @param opts
     * @param opts.session_id Session ID
     * @param opts.page 获取第几页tokens
     * @param opts.page_size 按每页多少条目分页
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    tokens(opts, cb) {
        if (!opts.session_id) {
            throw new Error('Session Id is required');
        }
        let url = this._apiUrl + this._endpoints.tokens.replace('{session_id}', opts.session_id);
        if (opts.page && opts.page_size) {
            url += '?page=' + opts.page + '&page_size=' + opts.page_size;
        }
        else if (opts.page_size) {
            url += '?page_size=' + opts.page_size;
        }
        else if (opts.page) {
            url += '?page=' + opts.page
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: url,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Query Permanent Tokens 获取永久Token列表
     * @param session_id Session ID
     * @param cb 可选，回调函数
     * @returns {Promise}
     * TODO: 增加page和page_size参数
     */
    permanentTokens(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required');
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.permanentTokens.replace('{session_id}', session_id),
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Query Temporary Tokens 获取临时Token列表
     * @param session_id Session ID
     * @param cb 可选，回调函数
     * TODO: 增加page和page_size参数
     */
    temporaryTokens(session_id, cb) {
        if (typeof session_id === 'undefined') {
            throw new Error('Session Id is required');
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.temporaryTokens.replace('{session_id}', session_id),
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        });
    }

    /**
     * Get a Token 获取单个Token
     * @param token_id Token ID
     * @param cb 可选，回调函数
     */
    token(token_id, cb) {
        if (typeof token_id === 'undefined') {
            throw new Error('Token Id is required')
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request({
                url: this._apiUrl + this._endpoints.token + token_id,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        })
    }

    /**
     * Update a Token 修改单个Token
     * @param token_id Token ID
     * @param label 可选，供开发者区分Token,长度255
     * @param permanent 为true时Token永不过期
     * @param data 开发者自定义数据,长度1024
     * @param live_days 存活时间
     * @param cb 可选，回调函数
     * @returns {Promise}
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
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.patch({
                url: this._apiUrl + this._endpoints.token + token_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                const response = JSON.parse(body);
                if (response.error) {
                    const error = new Error(`${response.error}: ${response.description}`);
                    reject(error);
                    return cb(error)
                }// handle response errors
                resolve(response);
                cb(null, response);
            });
        })
    }

    /**
     * Delete a Token 删除单个Token
     * @param token_id Token ID
     * @param cb 可选，回调函数
     * @returns {Promise}
     */
    delToken(token_id, cb) {
        if (typeof token_id === 'undefined') {
            throw new Error('Session Id is required')
        }
        cb = cb || function () {
            };
        return new Promise((resolve, reject) => {
            request.del({
                url: this._apiUrl + this._endpoints.token + token_id,
                headers: {
                    'X-RTCAT-APIKEY': this._apiKey,
                    'X-RTCAT-SECRET': this._apiSecret
                }
            }, function (err, resp, body) {
                if (err) {
                    reject(err);
                    return cb(err);
                }
                if (body) {
                    const response = JSON.parse(body);
                    if (response.error) {
                        const error = new Error(`${response.error}: ${response.description}`);
                        reject(error);
                        return cb(error);
                    } // handle response errors
                }
                resolve({status: "delete successfully"});
                cb(null, {status: "delete successfully"});
            });
        });
    }

}

module.exports = RealTimeCat;