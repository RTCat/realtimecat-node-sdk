var https = require('https');
var querystring = require('querystring');

var RealTimeCat = function (apiKey, apiSecret, env) {
    // 当用户没有使用`new`关键词调用RealTimeCat时，帮助新建一个实例
    if (!(this instanceof RealTimeCat)) return new RealTimeCat(apiKey, apiSecret, env);
};

/*
 * 创建房间方法
 * 参数说明：
 * callback参数是一个对象，
 * 其中可以包括的参数为：
 onsuccess: 成功时的调用函数
 onfail: 失败时的调用函数
 */
roomServices.createRoom = function (callback) {
    var postData = querystring.stringify({
        'type': "p2p"
    });

    var options = {
        hostname: 'api.realtimecat.com',
        port: 443,
        path: '/v0.1/sessions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
            'X-RTCAT-APIKEY': 'aa3fd28563b15f8c2b90ecafab116cd9',
            'X-RTCAT-SECRET': '7c2a083520d9b2a77345275f78cc3dab'
        }
    };

    var myReq = https.request(options, function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('BODY:' + chunk);
            callback.onsuccess(chunk)
        });
    });

    myReq.on('error', function (error) {
        console.dir('problem with request: ' + error.message);
        if (callback.onerror) {
            callback.onerror(error)
        }
    });

    // write data to request body
    myReq.write(postData);
    myReq.end()
};

/*
 * 进入房间方法
 * 参数说明：
 * 第一个参数即session id
 * 第二个参数是一个对象，
 * 其中可以包括的参数为：
 onsuccess: 成功时的调用函数
 onfail: 失败时的调用函数
 */
roomServices.joinRoom = function (sessionId, callback) {
    var postData = querystring.stringify({
        'session_id': sessionId,
        'type': 'pub'
    });

    var options = {
        hostname: 'api.realtimecat.com',
        port: 443,
        path: '/v0.1/tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
            'X-RTCAT-APIKEY': 'aa3fd28563b15f8c2b90ecafab116cd9',
            'X-RTCAT-SECRET': '7c2a083520d9b2a77345275f78cc3dab'
        }
    };

    var myReq = https.request(options, function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            callback.onsuccess(chunk);
        });
    });

    myReq.on('error', function (error) {
        console.dir('problem with request: ' + error.message);
        if (callback.onerror) {
            callback.onerror(error);
        }
    });

    // write data to request body
    myReq.write(postData);
    myReq.end();
};

module.exports = RealTimeCat;