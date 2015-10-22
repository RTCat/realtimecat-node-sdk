# realtimecat-node-sdk
实时猫 NodeJS Server SDK | RealTimeCat Server SDK for Node.js

## Usage

<pre>
var RealTimeCat = require('realtimecat-node-sdk');

var apiKey = "";
var apiSecret = "";
var session;

var realTimeCat = new RealTimeCat(apiKey, apiSecret);
realTimeCat.createSession(function (err, sessionId) {
    if (err) throw err;
    session = sessionId;
});

// 参数中不传token的type，默认type为pub
realTimeCat.getToken({session_id: session}, function (err, token) {
        if (err) throw err;
        console.log(token)
});

// 参数中传token的type
var opts = {
        type: 'sub',
        session_id: session
    };
realTimeCat.getToken(opts, function (err, token) {
        if (err) throw err;
        console.log(token)
});
</pre>