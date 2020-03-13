#!/usr/bin/env node

const express = require('express');
const mysql   = require('mysql');

const router = express.Router();

const con_db  = mysql.createConnection({
    host: 'localhost',
    user: 'leaf_eye',
    password: 'leaf_eye',
    database: 'leaf_eye'
});

con_db.connect();

router.get('/', function(req, res) {
    var query = 'select timestamp, humidity from data order by timestamp desc limit 10;';

    con_db.query(query, (err, rows, fields) => {
        if (err) {
            console.log('err: ', err);
        }

        array = []

        for (i in rows) {
            var timestamp = rows[i].timestamp;
            var row = {timestamp: timestamp, humidity: rows[i].humidity};
            array.push(row);
        }

        var data = {"humidity": array};
        res.header('content-type', 'application/json; charset=utf-8');
        res.send(JSON.stringify(data, null, 1));
    });

});

module.exports = router;
