'use strict';

var assert = require('assert');
var Client = require('../index');
var conf = require('./config');
var apiKey = conf.apiKey;
var apiSecret = conf.apiSecret;
var sessionId = conf.sessionId;
var tokenId = conf.tokenId;

var client = new Client({apiKey: apiKey, apiSecret: apiSecret, apiUrl: 'https://api.realtimecat.com:443'});

describe('Sessions', function () {
    describe('create sessions', function () {
        it('should create a session', function (done) {
            client.createSession({label: 'cb'}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                sessionId = resp.uuid;
                done();
            })
        });
        it('should create a session async', function (done) {
            client.createSession({label: 'promise'})
                .then(function (resp) {
                    console.log(resp);
                    sessionId = resp.uuid;
                    done();
                })
                .catch((e) => {
                    console.log(e);
                    done();
                })
        });

    });

    describe('sessions', function () {
        it('should return all sessions', function (done) {
            client.sessions({page: 1, page_size: 30}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        });
        it('should return all sessions async', function (done) {
            client.sessions({page: 1, page_size: 30})
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        });
        it('should return permanent sessions async', function (done) {
            client.permanentSessions()
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        });
        it('should return temporary sessions async', function (done) {
            client.temporarySessions()
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        it('should return a session async', function (done) {
            client.session(sessionId)
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        });
        it('should update the session async', function (done) {
            client.updateSession({
                session_id: sessionId,
                label: 'love is blind my ass'
            }).then(function (resp) {
                console.log(resp);
                done();
            }).catch((e) => {
                console.log(e);
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
        });
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
        it('should create two tokens async', function (done) {
            client.createToken({session_id: sessionId, number: 2})
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
                    done();
                })
        })
    });

    describe('tokens', function () {
        it('should return tokens', function (done) {
            client.tokens({session_id: sessionId, page: 1, page_size: 20}, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
        it('should return tokens async', function (done) {
            client.tokens({session_id: sessionId, page: 1, page_size: 20})
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        it('should return permanent tokens async', function (done) {
            client.permanentTokens(sessionId)
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
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
        it('should return temporary tokens async', function (done) {
            client.temporaryTokens(sessionId)
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
                    done();
                })
        })
    });

    describe('token', function () {

        it('should return a token', function (done) {
            client.token(tokenId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        });

        it('should return a token async', function (done) {
            client.token(tokenId)
                .then(function (resp) {
                    console.log(resp);
                    done();
                })
                .catch((e) => {
                    console.log(e);
                    done();
                })
        })
    });

    describe('update token', function () {
        it('should update the token', function (done) {
            client.updateToken({
                token_id: tokenId,
                label: 'love is blind'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        });
        it('should update the token async', function (done) {
            client.updateToken({
                token_id: tokenId,
                label: 'love is blind my ass'
            }, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

    describe('del token', function () {
        it('should delete the token', function (done) {
            client.delToken(tokenId, function (err, resp) {
                if (err)throw err;
                console.log(resp);
                done();
            })
        })
    });

});