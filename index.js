"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

function noop() {}

/**
 * RealTimeCat Client
 */

var RealTimeCat = function () {

    /**
     * Constructor
     * @param apiKey 实时猫API Key
     * @param apiSecret 实时猫API Secret
     * @param apiUrl 后端接口地址,形如https://api.realtimecat.com:443
     */

    function RealTimeCat() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            apiKey = _ref.apiKey,
            apiSecret = _ref.apiSecret,
            _ref$apiUrl = _ref.apiUrl,
            apiUrl = _ref$apiUrl === undefined ? 'https://api.realtimecat.com:443' : _ref$apiUrl;

        _classCallCheck(this, RealTimeCat);

        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空');
        } else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空');
        }
        this._version = 'v0.4';
        this._apiKey = apiKey;
        this._apiSecret = apiSecret;
        this._apiUrl = apiUrl;
        this._endpoints = {
            sessions: '/' + this._version + '/sessions',
            permanentSessions: '/' + this._version + '/sessions/permanent',
            temporarySessions: '/' + this._version + '/sessions/nonpermanent',
            session: '/' + this._version + '/sessions/',
            tokens: '/' + this._version + '/sessions/{session_id}/tokens',
            permanentTokens: '/' + this._version + '/sessions/{session_id}/tokens/permanent',
            temporaryTokens: '/' + this._version + '/sessions/{session_id}/tokens/nonpermanent',
            token: '/' + this._version + '/tokens/',
            records: '/' + this._version + '/records',
            record: '/' + this._version + '/records/'
        };
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

    _createClass(RealTimeCat, [{
        key: 'createSession',
        value: function createSession() {
            var _this = this;

            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                label = _ref2.label,
                data = _ref2.data,
                live_days = _ref2.live_days,
                _ref2$type = _ref2.type,
                type = _ref2$type === undefined ? 'p2p' : _ref2$type,
                _ref2$permanent = _ref2.permanent,
                permanent = _ref2$permanent === undefined ? false : _ref2$permanent;

            var cb = arguments[1];

            var opts = {
                label: label,
                data: data,
                live_days: live_days,
                type: type,
                permanent: permanent
            };
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.post({
                    url: _this._apiUrl + _this._endpoints.sessions,
                    form: opts,
                    headers: {
                        'X-RTCAT-APIKEY': _this._apiKey,
                        'X-RTCAT-SECRET': _this._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
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

    }, {
        key: 'sessions',
        value: function sessions(opts, cb) {
            var _this2 = this;

            if (typeof opts === 'function') {
                cb = opts;
                opts = {};
            }
            cb = cb || noop;
            var url = this._apiUrl + this._endpoints.sessions;
            if (opts.page && opts.page_size) {
                url += '?page=' + opts.page + '&page_size=' + opts.page_size;
            } else if (opts.page_size) {
                url += '?page_size=' + opts.page_size;
            } else if (opts.page) {
                url += '?page=' + opts.page;
            }
            return new Promise(function (resolve, reject) {
                request({
                    url: url,
                    headers: {
                        'X-RTCAT-APIKEY': _this2._apiKey,
                        'X-RTCAT-SECRET': _this2._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'permanentSessions',
        value: function permanentSessions(cb) {
            var _this3 = this;

            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this3._apiUrl + _this3._endpoints.permanentSessions,
                    headers: {
                        'X-RTCAT-APIKEY': _this3._apiKey,
                        'X-RTCAT-SECRET': _this3._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'temporarySessions',
        value: function temporarySessions(cb) {
            var _this4 = this;

            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this4._apiUrl + _this4._endpoints.temporarySessions,
                    headers: {
                        'X-RTCAT-APIKEY': _this4._apiKey,
                        'X-RTCAT-SECRET': _this4._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'session',
        value: function session(session_id, cb) {
            var _this5 = this;

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this5._apiUrl + _this5._endpoints.session + session_id,
                    headers: {
                        'X-RTCAT-APIKEY': _this5._apiKey,
                        'X-RTCAT-SECRET': _this5._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'updateSession',
        value: function updateSession() {
            var _this6 = this;

            var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                session_id = _ref3.session_id,
                label = _ref3.label,
                permanent = _ref3.permanent,
                data = _ref3.data,
                live_days = _ref3.live_days;

            var cb = arguments[1];

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            var opts = {
                session_id: session_id,
                label: label,
                permanent: permanent,
                data: data,
                live_days: live_days
            };
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.patch({
                    url: _this6._apiUrl + _this6._endpoints.session + session_id,
                    form: opts,
                    headers: {
                        'X-RTCAT-APIKEY': _this6._apiKey,
                        'X-RTCAT-SECRET': _this6._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'delSession',
        value: function delSession(session_id, cb) {
            var _this7 = this;

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.del({
                    url: _this7._apiUrl + _this7._endpoints.session + session_id,
                    headers: {
                        'X-RTCAT-APIKEY': _this7._apiKey,
                        'X-RTCAT-SECRET': _this7._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (body) {
                        var response = undefined;
                        try {
                            response = JSON.parse(body);
                        } catch (err) {
                            reject(err);
                            return cb(err);
                        }
                        if (response.error) {
                            var error = new Error(response.error + ': ' + response.description);
                            reject(error);
                            return cb(error);
                        } // handle response errors
                    }
                    resolve({ status: "delete successfully" });
                    cb(null, { status: "delete successfully" });
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

    }, {
        key: 'createToken',
        value: function createToken() {
            var _this8 = this;

            var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                session_id = _ref4.session_id,
                label = _ref4.label,
                data = _ref4.data,
                live_days = _ref4.live_days,
                _ref4$type = _ref4.type,
                type = _ref4$type === undefined ? 'pub' : _ref4$type,
                _ref4$permanent = _ref4.permanent,
                permanent = _ref4$permanent === undefined ? false : _ref4$permanent,
                _ref4$number = _ref4.number,
                number = _ref4$number === undefined ? 1 : _ref4$number;

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
                permanent: permanent,
                number: number
            };
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.post({
                    url: _this8._apiUrl + _this8._endpoints.tokens.replace('{session_id}', session_id),
                    form: opts,
                    headers: {
                        'X-RTCAT-APIKEY': _this8._apiKey,
                        'X-RTCAT-SECRET': _this8._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'tokens',
        value: function tokens(opts, cb) {
            var _this9 = this;

            if (!opts.session_id) {
                throw new Error('Session Id is required');
            }
            var url = this._apiUrl + this._endpoints.tokens.replace('{session_id}', opts.session_id);
            if (opts.page && opts.page_size) {
                url += '?page=' + opts.page + '&page_size=' + opts.page_size;
            } else if (opts.page_size) {
                url += '?page_size=' + opts.page_size;
            } else if (opts.page) {
                url += '?page=' + opts.page;
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: url,
                    headers: {
                        'X-RTCAT-APIKEY': _this9._apiKey,
                        'X-RTCAT-SECRET': _this9._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'permanentTokens',
        value: function permanentTokens(session_id, cb) {
            var _this10 = this;

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this10._apiUrl + _this10._endpoints.permanentTokens.replace('{session_id}', session_id),
                    headers: {
                        'X-RTCAT-APIKEY': _this10._apiKey,
                        'X-RTCAT-SECRET': _this10._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'temporaryTokens',
        value: function temporaryTokens(session_id, cb) {
            var _this11 = this;

            if (typeof session_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this11._apiUrl + _this11._endpoints.temporaryTokens.replace('{session_id}', session_id),
                    headers: {
                        'X-RTCAT-APIKEY': _this11._apiKey,
                        'X-RTCAT-SECRET': _this11._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
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

    }, {
        key: 'token',
        value: function token(token_id, cb) {
            var _this12 = this;

            if (typeof token_id === 'undefined') {
                throw new Error('Token Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request({
                    url: _this12._apiUrl + _this12._endpoints.token + token_id,
                    headers: {
                        'X-RTCAT-APIKEY': _this12._apiKey,
                        'X-RTCAT-SECRET': _this12._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
                    resolve(response);
                    cb(null, response);
                });
            });
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

    }, {
        key: 'updateToken',
        value: function updateToken() {
            var _this13 = this;

            var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                token_id = _ref5.token_id,
                label = _ref5.label,
                permanent = _ref5.permanent,
                data = _ref5.data,
                live_days = _ref5.live_days;

            var cb = arguments[1];

            if (typeof token_id === 'undefined') {
                throw new Error('Token Id is required');
            }
            var opts = {
                token_id: token_id,
                label: label,
                permanent: permanent,
                data: data,
                live_days: live_days
            };
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.patch({
                    url: _this13._apiUrl + _this13._endpoints.token + token_id,
                    form: opts,
                    headers: {
                        'X-RTCAT-APIKEY': _this13._apiKey,
                        'X-RTCAT-SECRET': _this13._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    var response = undefined;
                    try {
                        response = JSON.parse(body);
                    } catch (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (response.error) {
                        var error = new Error(response.error + ': ' + response.description);
                        reject(error);
                        return cb(error);
                    } // handle response errors
                    resolve(response);
                    cb(null, response);
                });
            });
        }

        /**
         * Delete a Token 删除单个Token
         * @param token_id Token ID
         * @param cb 可选，回调函数
         * @returns {Promise}
         */

    }, {
        key: 'delToken',
        value: function delToken(token_id, cb) {
            var _this14 = this;

            if (typeof token_id === 'undefined') {
                throw new Error('Session Id is required');
            }
            cb = cb || noop;
            return new Promise(function (resolve, reject) {
                request.del({
                    url: _this14._apiUrl + _this14._endpoints.token + token_id,
                    headers: {
                        'X-RTCAT-APIKEY': _this14._apiKey,
                        'X-RTCAT-SECRET': _this14._apiSecret
                    }
                }, function (err, resp, body) {
                    if (err) {
                        reject(err);
                        return cb(err);
                    }
                    if (body) {
                        var response = undefined;
                        try {
                            response = JSON.parse(body);
                        } catch (err) {
                            reject(err);
                            return cb(err);
                        }
                        if (response.error) {
                            var error = new Error(response.error + ': ' + response.description);
                            reject(error);
                            return cb(error);
                        } // handle response errors
                    }
                    resolve({ status: "delete successfully" });
                    cb(null, { status: "delete successfully" });
                });
            });
        }
    }]);

    return RealTimeCat;
}();

module.exports = RealTimeCat;
//# sourceMappingURL=index.js.map
