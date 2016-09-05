"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');

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
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var apiKey = _ref.apiKey;
        var apiSecret = _ref.apiSecret;
        var _ref$apiUrl = _ref.apiUrl;
        var apiUrl = _ref$apiUrl === undefined ? 'https://api.realtimecat.com:443' : _ref$apiUrl;

        _classCallCheck(this, RealTimeCat);

        if (typeof apiKey === 'undefined') {
            throw new Error('API Key 不能为空');
        } else if (typeof apiSecret === 'undefined') {
            throw new Error('API Secret 不能为空');
        }
        this.version = 'v0.4';
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = apiUrl;
        this.endpoints = {
            info: '/' + this.version + '/',
            sessions: '/' + this.version + '/sessions',
            permanentSessions: '/' + this.version + '/sessions/permanent',
            temporarySessions: '/' + this.version + '/sessions/nonpermanent',
            session: '/' + this.version + '/sessions/',
            tokens: '/' + this.version + '/sessions/{session_id}/tokens',
            permanentTokens: '/' + this.version + '/sessions/{session_id}/tokens/permanent',
            temporaryTokens: '/' + this.version + '/sessions/{session_id}/tokens/nonpermanent',
            token: '/' + this.version + '/tokens/',
            records: '/' + this.version + '/records',
            record: '/' + this.version + '/records/',
            sessionslogs: '/' + this.version + '/logs/sessions',
            tokenslogs: '/' + this.version + '/logs/tokens',
            tokenlogs: '/' + this.version + '/logs/sessions/',
            configurations: '/' + this.version + '/configurations'
        };
    }

    /**
     * Get API Basic Info 获取本 API 基本信息
     * @param cb 回调函数
     */

    _createClass(RealTimeCat, [{
        key: 'info',
        value: function info(cb) {
            request({
                url: this.apiUrl + this.endpoints.info
            }, function (err, resp, body) {
                if (err) return cb(new Error('请求失败: ' + err));
                var response = JSON.parse(body);
                return cb(null, response);
            });
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

    }, {
        key: 'createSession',
        value: function createSession() {
            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var label = _ref2.label;
            var data = _ref2.data;
            var live_days = _ref2.live_days;
            var _ref2$type = _ref2.type;
            var type = _ref2$type === undefined ? 'p2p' : _ref2$type;
            var _ref2$permanent = _ref2.permanent;
            var permanent = _ref2$permanent === undefined ? false : _ref2$permanent;
            var cb = arguments[1];

            var opts = {
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

    }, {
        key: 'sessions',
        value: function sessions(opts, cb) {
            var url = this.apiUrl + this.endpoints.sessions;
            if (typeof opts === 'function') {
                cb = opts;
                opts = {};
            }
            if (opts.page && opts.page_size) {
                url += '?page=' + opts.page + '&page_size=' + opts.page_size;
            } else if (opts.page_size) {
                url += '?page_size=' + opts.page_size;
            } else if (opts.page) {
                url += '?page=' + opts.page;
            }
            request({
                url: url,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
                }
            }, function (err, resp, body) {

                if (err) return cb(new Error('The request failed: ' + err));

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query Permanent Sessions 获取永久Session列表
         * @param cb 回调函数
         * TODO: 增加page和page_size参数
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Query Temporary Sessions 获取临时Session列表
         * @param cb 回调函数
         * TODO: 增加page和page_size参数
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Get a Specific Session 获取单个Session
         * @param session_id Session ID
         * @param cb 回调函数
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

    }, {
        key: 'updateSession',
        value: function updateSession() {
            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var session_id = _ref3.session_id;
            var label = _ref3.label;
            var permanent = _ref3.permanent;
            var data = _ref3.data;
            var live_days = _ref3.live_days;
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
            request.patch({
                url: this.apiUrl + this.endpoints.session + session_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
                }
            }, function (err, resp, body) {
                if (err) return cb(new Error('The request failed: ' + err));

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Delete a Session 删除单个Session
         * @param session_id Session ID
         * @param cb 回调函数
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

    }, {
        key: 'createToken',
        value: function createToken() {
            var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var session_id = _ref4.session_id;
            var label = _ref4.label;
            var data = _ref4.data;
            var live_days = _ref4.live_days;
            var _ref4$type = _ref4.type;
            var type = _ref4$type === undefined ? 'pub' : _ref4$type;
            var _ref4$permanent = _ref4.permanent;
            var permanent = _ref4$permanent === undefined ? false : _ref4$permanent;
            var _ref4$number = _ref4.number;
            var number = _ref4$number === undefined ? 1 : _ref4$number;
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
            request.post({
                url: this.apiUrl + this.endpoints.tokens.replace('{session_id}', session_id),
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
                }
            }, function (err, resp, body) {
                if (err) return cb(new Error('The request failed: ' + err));

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

    }, {
        key: 'tokens',
        value: function tokens(opts, cb) {
            if (!opts.session_id) {
                throw new Error('Session Id is required');
            }
            var url = this.apiUrl + this.endpoints.tokens.replace('{session_id}', opts.session_id);
            if (opts.page && opts.page_size) {
                url += '?page=' + opts.page + '&page_size=' + opts.page_size;
            } else if (opts.page_size) {
                url += '?page_size=' + opts.page_size;
            } else if (opts.page) {
                url += '?page=' + opts.page;
            }
            request({
                url: url,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
                }
            }, function (err, resp, body) {
                if (err) return cb(new Error('The request failed: ' + err));

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Get a Token 获取单个Token
         * @param token_id Token ID
         * @param cb 回调函数
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

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
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

    }, {
        key: 'updateToken',
        value: function updateToken() {
            var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var token_id = _ref5.token_id;
            var label = _ref5.label;
            var permanent = _ref5.permanent;
            var data = _ref5.data;
            var live_days = _ref5.live_days;
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
            request.patch({
                url: this.apiUrl + this.endpoints.token + token_id,
                form: opts,
                headers: {
                    'X-RTCAT-APIKEY': this.apiKey,
                    'X-RTCAT-SECRET': this.apiSecret
                }
            }, function (err, resp, body) {
                if (err) return cb(new Error('The request failed: ' + err));

                var response = JSON.parse(body);

                // handle response errors
                if (response.error) {
                    return cb(new Error(response.error + ': ' + response.description));
                }

                cb(null, response);
            });
        }

        /**
         * Delete a Token 删除单个Token
         * @param token_id Token ID
         * @param cb 回调函数
         */

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

    return RealTimeCat;
}();

module.exports = RealTimeCat;
//# sourceMappingURL=index.js.map
