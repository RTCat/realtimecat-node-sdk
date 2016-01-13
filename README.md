# realtimecat-node-sdk
实时猫 NodeJS Server SDK | RealTimeCat Server SDK for Node.js

## 0.2.0

0.2.0版SDK配合0.2版实时猫接口使用

### Install

`npm install realtimecat-node-sdk --save`

### Usage

```javascript
var RealTimeCat = require('realtimecat-node-sdk');

var apiKey = "";
var apiSecret = "";
var realtimecat = new RealTimeCat(apiKey, apiSecret);
```

### API

请阅读API[文档](docs/API.md)

## 0.1.0

0.1.0版SDK配合实时猫 RealTimeCat Server API version 0.1接口使用

### Install

`npm install realtimecat-node-sdk@">=0.1.0 <0.2.0" --save`

### Usage

```javascript
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
```

