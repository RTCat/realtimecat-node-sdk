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
var apiUrl = "";
var realtimecat = new RealTimeCat({apiKey:apiKey, apiSecret:apiSecret, apiUrl: apiUrl});
```

### API

请阅读API[文档](docs/API.md)

### 测试

`npm install -g mocha`

clone项目至本地,运行`npm install`安装依赖, 运行`npm test`进行测试

## 0.1.0

0.1.0版SDK配合0.1版实时猫接口使用

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

