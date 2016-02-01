'use strict';

var assert = require('assert');
var Client = require('../index');
var apiKey = 'd8cf2c2c-fac7-4b5a-a1be-9a9665ba908c';
var apiSecret = '99ca8fad-fd1f-499e-8849-3d5086735e93';
var sessionId;

var client = new Client({apiKey: apiKey, apiSecret: apiSecret, apiUrl:'https://api.realtimecat.com:443'});

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
                    message: '实时猫 RealTimeCat Server API version 0.2, copyright RealTimeCat.com',
                    support_email: 'info@learning-tech.com',
                    documentation_url: 'http://shishimao.com/docs',
                    version: '0.2',
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
            client.sessions(function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });

    describe('permanent sessions', function () {
        it('should return permanent sessions', function (done) {
            client.permanentSessions(function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });

    describe('temporary sessions', function () {
        it('should return temporary sessions', function (done) {
            client.temporarySessions(function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });

    describe('session', function () {
        it('should return a session', function (done) {
            client.session(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });

    describe('update session', function () {
        it('should update the session', function (done) {
            client.updateSession({
                session_id: sessionId,
                label: 'test222'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });

    describe('del session', function () {
        it('should delete the session', function (done) {
            client.delSession(sessionId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
                done();
            })
        })
    });
});

describe('Tokens', function () {

    describe('create token', function () {
        it('should create a token', function (done) {
            client.createToken({session_id: '20d4f632-b3b1-40f6-a546-2ec19208e321'}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('tokens', function () {
        it('should return tokens', function (done) {
            client.tokens('20d4f632-b3b1-40f6-a546-2ec19208e321', function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('permanent tokens', function () {
        it('should return permanent tokens', function (done) {
            client.permanentTokens('20d4f632-b3b1-40f6-a546-2ec19208e321', function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('temporary tokens', function () {
        it('should return temporary tokens', function (done) {
            client.temporaryTokens('20d4f632-b3b1-40f6-a546-2ec19208e321', function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('token', function () {
        it('should return a token', function (done) {
            client.token('8904c2be-59ae-4363-8bf9-b7d1d3e0467e', function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('update token', function () {
        it('should update the token', function (done) {
            client.updateToken({
                token_id: '8904c2be-59ae-4363-8bf9-b7d1d3e0467e',
                label: 'test222'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('del token', function () {
        it('should delete the token', function (done) {
            client.delToken("8904c2be-59ae-4363-8bf9-b7d1d3e0467e", function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

});