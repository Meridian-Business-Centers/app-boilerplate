'use strict';

const express = require('express');
const compression = require('compression');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const _ = require('lodash');
const history = require('connect-history-api-fallback');
const utility = require('./ulility');
const db = require('./db');

app.get('/health', async function (req, res){
    try {
        res.send({
            status: 'ok',
            date: await db.row(`select now()`)
        });
    } catch (err) {
        console.error(err);
    }
});


app.use(compression());
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use('/dist/', express.static(path.join(__dirname, '../', 'dist')));

module.exports.app = app;
module.exports.server = server;
module.exports.io = io;