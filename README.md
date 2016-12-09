# realtimecat-node-sdk
实时猫 NodeJS Server SDK | RealTimeCat Server SDK for Node.js

配合0.4版[实时猫接口](https://api.realtimecat.com/docs/#!/v0.4)使用

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

clone项目至本地,运行`npm install`安装依赖, 复制`config.sample.js`重命名为`config.js`,
添加`api key`和`secret`, 运行`npm test`进行测试

