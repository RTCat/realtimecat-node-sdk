'use strict';

var assert = require('assert');
var Client = require('../index');
var apiKey = '5235f94f-3cfa-4c24-943e-c0d5316bd544';
var apiSecret = 'ffbb2c56-b67c-44b6-ae7b-a83f8e4089aa';
var sessionId;

var client = new Client(apiKey, apiSecret);

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

//describe('Sessions', function(){
//    describe('create sessions', function () {
//        it('should create a session', function (done) {
//            client.createSession({label:'test'},function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                sessionId = resp.uuid;
//                done();
//            })
//        })
//    });
//
//    describe('sessions', function () {
//        it('should return all sessions', function (done) {
//            client.sessions(function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//
//    describe('permanent sessions', function () {
//        it('should return permanent sessions', function (done) {
//            client.permanentSessions(function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//
//    describe('temporary sessions', function () {
//        it('should return temporary sessions', function (done) {
//            client.temporarySessions(function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//
//    describe('session', function () {
//        it('should return a session', function (done) {
//            client.session(sessionId, function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//
//    describe('update session', function () {
//        it('should update the session', function (done) {
//            client.updateSession({
//                session_id: sessionId,
//                label: 'test222'
//            }, function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//
//    describe('del session', function () {
//        it('should delete the session', function (done) {
//            client.delSession(sessionId, function (err, resp) {
//                if (err)throw err;
//                console.log(resp);
//                //assert.deepEqual({ count: 0, next: null, previous: null, results: [] }, resp);
//                done();
//            })
//        })
//    });
//});

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

});