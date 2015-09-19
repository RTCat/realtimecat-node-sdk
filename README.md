# realtimecat-node-sdk
实时猫 Node.js SDK | RealTimeCat SDK for Node.js

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

realTimeCat.getToken({session_id: session}, function (err, token) {
        if (err) throw err;
        console.log(token)
});
</pre>
