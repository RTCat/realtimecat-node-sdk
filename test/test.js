'use strict';

var assert = require('assert');
var Client = require('../index');
var conf = require('./config');
var apiKey = conf.apiKey;
var apiSecret = conf.apiSecret;
var sessionId = conf.sessionId;

var client = new Client({apiKey: apiKey, apiSecret: apiSecret, apiUrl: 'https://api.realtimecat.com:443'});

describe('Client', function () {

    describe('constructor', function () {
        it('should return err', function () {
            try {
                var client1 = new Client();
            } catch (e) {
                console.log(e)
            }
        })
    });

    describe('info', function () {
        it('should return api info', function (done) {
            client.info(function (err, resp) {
                if (err) throw err;
                assert.deepEqual({
                    message: '实时猫 RealTimeCat Server API version 0.3, copyright RealTimeCat.com',
                    support_email: 'info@learning-tech.com',
                    documentation_url: 'http://shishimao.com/docs',
                    version: '0.3',
                    copyright: '北京乐塔克科技有限公司',
                    tel: '4006406411',
                    website_url: 'http://shishimao.com'
                }, resp);
                done();
            });
        });
    });

});

describe('Sessions', function () {
    describe('create sessions', function () {
        it('should create a session', function (done) {
            client.createSession({label: 'test'}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                sessionId = resp.uuid;
                done();
            })
        })
    });

    describe('sessions', function () {
        it('should return all sessions', function (done) {
            client.sessions({page:1, page_size:30},function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('permanent sessions', function () {
        it('should return permanent sessions', function (done) {
            client.permanentSessions(function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('temporary sessions', function () {
        it('should return temporary sessions', function (done) {
            client.temporarySessions(function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('session', function () {
        it('should return a session', function (done) {
            client.session(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('update session', function () {
        it('should update the session', function (done) {
            client.updateSession({
                session_id: sessionId,
                label: 'love is blind'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('del session', function () {
        it('should delete the session', function (done) {
            client.delSession(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });
});

describe('Tokens', function () {

    describe('create token', function () {
        it('should create two tokens', function (done) {
            client.createToken({session_id: sessionId, number: 2}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('tokens', function () {
        it('should return tokens', function (done) {
            client.tokens({session_id:sessionId, page:2, page_size:20}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('permanent tokens', function () {
        it('should return permanent tokens', function (done) {
            client.permanentTokens(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('temporary tokens', function () {
        it('should return temporary tokens', function (done) {
            client.temporaryTokens(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('token', function () {
        it('should return a token', function (done) {
            client.token('4df07516-fa7c-40ac-9479-f48a54e1d12b', function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('update token', function () {
        it('should update the token', function (done) {
            client.updateToken({
                token_id: '4df07516-fa7c-40ac-9479-f48a54e1d12b',
                label: 'love is blind'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('del token', function () {
        it('should delete the token', function (done) {
            client.delToken("4df07516-fa7c-40ac-9479-f48a54e1d12b", function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

});