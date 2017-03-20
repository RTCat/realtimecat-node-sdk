<a name="RealTimeCat"></a>

## RealTimeCat
RealTimeCat Client

**Kind**: global class  

* [RealTimeCat](#RealTimeCat)
    * [new RealTimeCat(apiKey, apiSecret, apiUrl)](#new_RealTimeCat_new)
    * [.createSession(label, data, live_days, type, permanent, cb)](#RealTimeCat+createSession) ⇒ <code>Promise</code>
    * [.sessions(opts, cb)](#RealTimeCat+sessions) ⇒ <code>Promise</code>
    * [.permanentSessions(cb)](#RealTimeCat+permanentSessions) ⇒ <code>Promise</code>
    * [.temporarySessions(cb)](#RealTimeCat+temporarySessions) ⇒ <code>Promise</code>
    * [.session(session_id, cb)](#RealTimeCat+session) ⇒ <code>Promise</code>
    * [.updateSession(session_id, label, permanent, data, live_days, cb)](#RealTimeCat+updateSession)
    * [.delSession(session_id, cb)](#RealTimeCat+delSession)
    * [.createToken(session_id, label, data, live_days, type, permanent, number, cb)](#RealTimeCat+createToken) ⇒ <code>Promise</code>
    * [.tokens(opts, cb)](#RealTimeCat+tokens) ⇒ <code>Promise</code>
    * [.permanentTokens(session_id, cb)](#RealTimeCat+permanentTokens) ⇒ <code>Promise</code>
    * [.temporaryTokens(session_id, cb)](#RealTimeCat+temporaryTokens)
    * [.token(token_id, cb)](#RealTimeCat+token)
    * [.updateToken(token_id, label, permanent, data, live_days, cb)](#RealTimeCat+updateToken) ⇒ <code>Promise</code>
    * [.delToken(token_id, cb)](#RealTimeCat+delToken) ⇒ <code>Promise</code>

<a name="new_RealTimeCat_new"></a>

### new RealTimeCat(apiKey, apiSecret, apiUrl)
Constructor


| Param | Description |
| --- | --- |
| apiKey | 实时猫API Key |
| apiSecret | 实时猫API Secret |
| apiUrl | 后端接口地址,形如https://api.realtimecat.com:443 |

<a name="RealTimeCat+createSession"></a>

### realTimeCat.createSession(label, data, live_days, type, permanent, cb) ⇒ <code>Promise</code>
Create a Session 新建Session

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| label | 可选，供开发者区分Session,长度255 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| type | 类型,仅可以为p2p或rel |
| permanent | true/false, 为true时Session永不过期 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+sessions"></a>

### realTimeCat.sessions(opts, cb) ⇒ <code>Promise</code>
Query Sessions 获取Session列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| opts |  |
| opts.page | 获取第几页 |
| opts.page_size | 按每页多少条目分页 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+permanentSessions"></a>

### realTimeCat.permanentSessions(cb) ⇒ <code>Promise</code>
Query Permanent Sessions 获取永久Session列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  
**Todo:**: 增加page和page_size参数  

| Param | Description |
| --- | --- |
| cb | 可选，回调函数 |

<a name="RealTimeCat+temporarySessions"></a>

### realTimeCat.temporarySessions(cb) ⇒ <code>Promise</code>
Query Temporary Sessions 获取临时Session列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  
**Todo:**: 增加page和page_size参数  

| Param | Description |
| --- | --- |
| cb | 可选，回调函数 |

<a name="RealTimeCat+session"></a>

### realTimeCat.session(session_id, cb) ⇒ <code>Promise</code>
Get a Specific Session 获取单个Session

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 可选，回调函数 |

<a name="RealTimeCat+updateSession"></a>

### realTimeCat.updateSession(session_id, label, permanent, data, live_days, cb)
Update a Session 修改单个Session

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| label | 可选，供开发者区分Session,长度255 |
| permanent | true/false, 为true时Session永不过期 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+delSession"></a>

### realTimeCat.delSession(session_id, cb)
Delete a Session 删除单个Session

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 可选，回调函数 |

<a name="RealTimeCat+createToken"></a>

### realTimeCat.createToken(session_id, label, data, live_days, type, permanent, number, cb) ⇒ <code>Promise</code>
Create a Token Under a Session 创建Session ID下的Token

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| label | 可选，供开发者区分Token,长度255 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| type | 类型,仅可以为pub或sub |
| permanent | true/false,为true时Token永不过期 |
| number | 创建个数 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+tokens"></a>

### realTimeCat.tokens(opts, cb) ⇒ <code>Promise</code>
Query Tokens Under a Session 获取Session ID下的所有Token列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| opts |  |
| opts.session_id | Session ID |
| opts.page | 获取第几页tokens |
| opts.page_size | 按每页多少条目分页 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+permanentTokens"></a>

### realTimeCat.permanentTokens(session_id, cb) ⇒ <code>Promise</code>
Query Permanent Tokens 获取永久Token列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  
**Returns**: <code>Promise</code> - TODO: 增加page和page_size参数  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 可选，回调函数 |

<a name="RealTimeCat+temporaryTokens"></a>

### realTimeCat.temporaryTokens(session_id, cb)
Query Temporary Tokens 获取临时Token列表

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 可选，回调函数 TODO: 增加page和page_size参数 |

<a name="RealTimeCat+token"></a>

### realTimeCat.token(token_id, cb)
Get a Token 获取单个Token

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| cb | 可选，回调函数 |

<a name="RealTimeCat+updateToken"></a>

### realTimeCat.updateToken(token_id, label, permanent, data, live_days, cb) ⇒ <code>Promise</code>
Update a Token 修改单个Token

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| label | 可选，供开发者区分Token,长度255 |
| permanent | 为true时Token永不过期 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| cb | 可选，回调函数 |

<a name="RealTimeCat+delToken"></a>

### realTimeCat.delToken(token_id, cb) ⇒ <code>Promise</code>
Delete a Token 删除单个Token

**Kind**: instance method of <code>[RealTimeCat](#RealTimeCat)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| cb | 可选，回调函数 |

