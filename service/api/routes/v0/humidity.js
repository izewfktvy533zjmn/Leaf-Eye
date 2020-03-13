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


router.get(/date/, function(req, res) {
    var parameters = req.path.split('/');
    console.log(parameters);
    
    if (parameters.length == 5 || parameters.length == 8) {
        var startDate   = parameters[2];
        var endDate     = parameters[3];
        var detailLevel = parameters[4];

        if (endDate == '1d') {
            endDate = startDate;
        }

        switch (detailLevel) {
            case '1sec':
                console.log("detailLevel:", detailLevel);
                break;

            case '1min':
                console.log("detailLevel:", detailLevel);
                break;
        }

    }
    else {
        // query error handle
    }

    if (parameters.length == 5) {
        console.log(startDate, endDate, detailLevel);
        
        var query = 'select timestamp, humidity from data where timestamp between \'' + startDate + ' 00:00:00\' and \'' + endDate + ' 23:59:59\';';
    }
    else if (parameters.length == 8) {
        let startTime = parameters[6];
        let endTime   = parameters[7];
        var query = `select timestamp, humidity from data where timestamp "${startDate} ${startTime}" <= timestamp and timestamp < "${endDate} ${endTime}";`;
        console.log(query);
    }

    con_db.query(query, (err, rows, fields) => {
        if (err) {
            console.log('err: ', err);
        }

        array = [];

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

