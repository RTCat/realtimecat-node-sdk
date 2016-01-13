var RealTimeCat = require('../lib/realtimecat.js');

var apiKey = "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx";
var apiSecret = "xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx";
var realTimeCat = new RealTimeCat(apiKey, apiSecret);

// Simple createSession Test
realTimeCat.createSession(function (err, sessionId) {
    if (err) return console.log(err);
    console.log('Simple createSession Test Passed With: ' + sessionId);
    simpleGetTokenTest(sessionId);
    advancedGetTokenTest(sessionId);
});

// Simple getToken Test
function simpleGetTokenTest(session) {
    realTimeCat.getToken({session_id: session}, function (err, token) {
        if (err) console.log(err);
        console.log("Simple getToken Test Passed With:" + token)
    });
}

// Advanced getToken Test
function advancedGetTokenTest(session) {
    var opts = {
        type: 'sub',
        session_id: session
    };
    realTimeCat.getToken(opts, function (err, token) {
        if (err) console.log(err);
        console.log("Get sub Type Token Test Passed With:" + token)
    });

}


