var _ = require('lodash'),
    Client = require("./client");

var RealTimeCat = function (apiKey, apiSecret, env) {
    // 当用户没有使用`new`关键词调用RealTimeCat时，帮助新建一个实例
    if (!(this instanceof RealTimeCat)) return new RealTimeCat(apiKey, apiSecret, env);

    // validate arguments: apiKey := Number|String, apiSecret := String
    if (!(_.isNumber(apiKey) || _.isString(apiKey)) || !_.isString(apiSecret)) {
        throw new Error('Invalid arguments when initializing RealTimeCat: apiKey=' + apiKey + ', apiSecret=' + apiSecret);
    }

    // apiKey argument can be a Number, but we will internally store it as a String
    if (_.isNumber(apiKey)) apiKey = apiKey.toString();

    this._client = new Client({apiKey: apiKey, apiSecret: apiSecret});
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    // env can be either an object with a bunch of DI options, or a simple string for the apiUrl
    var clientConfig = {
        request: {}
    };
    if (_.isString(env)) {
        clientConfig.apiUrl = env;
    } else if (_.isObject(env) && !_.isFunction(env) && !_.isArray(env)) {
        if (_.isString(env.apiUrl)) {
            clientConfig.apiUrl = env.apiUrl;
        }
        if (_.isString(env.proxy)) {
            clientConfig.request.proxy = env.proxy;
        }
    }
    var config = this._client.config(clientConfig);
    this.apiUrl = config.apiUrl;
};

RealTimeCat.prototype.createSession = function (opts, callback) {
    var self = this;

    if (_.isFunction(opts)) {
        // shift arguments if the opts is left out
        callback = opts;
        opts = {};
    } else if (!_.isFunction(callback)) {
        // one of the args has to be a function, or we bail
        throw new Error('Invalid arguments when calling createSession, must provide a callback');
    }

    _.pick(_.defaults(opts, {"type": "p2p"}), "type");

    // avoid mutating passed in options
    opts = _.clone(opts);

    this._client.createSession(opts, function (err, json) {
        if (err) return callback(new Error('Failed to createSession. ' + err));
        callback(null, json.session_id);
    });
};

RealTimeCat.prototype.getToken = function (opts, callback) {
    var self = this;

    if (_.isFunction(opts)) {
        // shift arguments if the opts is left out
        callback = opts;
        opts = {};
    } else if (!_.isFunction(callback)) {
        // one of the args has to be a function, or we bail
        throw new Error('Invalid arguments when calling getToken, must provide a callback');
    }

    _.pick(_.defaults(opts, {"type": "pub"}), "type", "session_id");

    if (!opts.session_id) {
        return process.nextTick(function () {
            callback(new Error('Invalid arguments when calling createSession, must provide a session_id.'));
        });
    }

    // avoid mutating passed in options
    opts = _.clone(opts);

    this._client.getToken(opts, function (err, json) {
        if (err) return callback(new Error('Failed to getToken. ' + err));
        callback(null, json.token);
    });
};

module.exports = RealTimeCat;