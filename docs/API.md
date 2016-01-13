<a name="Client"></a>
## Client
RealTimeCat Client

**Kind**: global class  

* [Client](#Client)
    * [new Client(apiKey, apiSecret)](#new_Client_new)
    * [.info(cb)](#Client+info)
    * [.createSession(label, data, live_days, type, persistent, cb)](#Client+createSession)
    * [.sessions(cb)](#Client+sessions)
    * [.permanentSessions(cb)](#Client+permanentSessions)
    * [.temporarySessions(cb)](#Client+temporarySessions)
    * [.session(session_id, cb)](#Client+session)
    * [.updateSession(session_id, label, persistent, data, live_days, cb)](#Client+updateSession)
    * [.delSession(session_id, cb)](#Client+delSession)
    * [.createToken(session_id, label, data, live_days, type, persistent, cb)](#Client+createToken)
    * [.tokens(session_id, cb)](#Client+tokens)
    * [.permanentTokens(session_id, cb)](#Client+permanentTokens)
    * [.temporaryTokens(session_id, cb)](#Client+temporaryTokens)
    * [.token(token_id, cb)](#Client+token)
    * [.updateToken(token_id, label, persistent, data, live_days, cb)](#Client+updateToken)
    * [.delToken(token_id, cb)](#Client+delToken)

<a name="new_Client_new"></a>
### new Client(apiKey, apiSecret)
Constructor


| Param |
| --- |
| apiKey | 
| apiSecret | 

<a name="Client+info"></a>
### client.info(cb)
Get API Basic Info 获取本 API 基本信息

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| cb | 回调函数 |

<a name="Client+createSession"></a>
### client.createSession(label, data, live_days, type, persistent, cb)
Create a Session 新建Session

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| label | 可选，供开发者区分Session,长度255 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| type | 类型,仅可以为p2p或rel |
| persistent | true/false, 为true时Session永不过期 |
| cb | 回调函数 |

<a name="Client+sessions"></a>
### client.sessions(cb)
Query Sessions 获取Session列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| cb | 回调函数 |

<a name="Client+permanentSessions"></a>
### client.permanentSessions(cb)
Query Permanent Sessions 获取永久Session列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| cb | 回调函数 |

<a name="Client+temporarySessions"></a>
### client.temporarySessions(cb)
Query Temporary Sessions 获取临时Session列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| cb | 回调函数 |

<a name="Client+session"></a>
### client.session(session_id, cb)
Get a Specific Session 获取单个Session

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 回调函数 |

<a name="Client+updateSession"></a>
### client.updateSession(session_id, label, persistent, data, live_days, cb)
Update a Session 修改单个Session

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| label | 可选，供开发者区分Session,长度255 |
| persistent | true/false, 为true时Session永不过期 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| cb | 回调函数 |

<a name="Client+delSession"></a>
### client.delSession(session_id, cb)
Delete a Session 删除单个Session

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 回调函数 |

<a name="Client+createToken"></a>
### client.createToken(session_id, label, data, live_days, type, persistent, cb)
Create a Token Under a Session 创建Session ID下的Token

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| label | 可选，供开发者区分Token,长度255 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| type | 类型,仅可以为pub或sub |
| persistent | true/false,为true时Token永不过期 |
| cb | 回调函数 |

<a name="Client+tokens"></a>
### client.tokens(session_id, cb)
Query Tokens Under a Session 获取Session ID下的所有Token列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 回调函数 |

<a name="Client+permanentTokens"></a>
### client.permanentTokens(session_id, cb)
Query Permanent Tokens 获取永久Token列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 回调函数 |

<a name="Client+temporaryTokens"></a>
### client.temporaryTokens(session_id, cb)
Query Temporary Tokens 获取临时Token列表

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| session_id | Session ID |
| cb | 回调函数 |

<a name="Client+token"></a>
### client.token(token_id, cb)
Get a Token 获取单个Token

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| cb | 回调函数 |

<a name="Client+updateToken"></a>
### client.updateToken(token_id, label, persistent, data, live_days, cb)
Update a Token 修改单个Token

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| label | 可选，供开发者区分Token,长度255 |
| persistent | 为true时Token永不过期 |
| data | 开发者自定义数据,长度1024 |
| live_days | 存活时间 |
| cb | 回调函数 |

<a name="Client+delToken"></a>
### client.delToken(token_id, cb)
Delete a Token 删除单个Token

**Kind**: instance method of <code>[Client](#Client)</code>  

| Param | Description |
| --- | --- |
| token_id | Token ID |
| cb | 回调函数 |

