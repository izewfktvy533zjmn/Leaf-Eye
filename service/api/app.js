#!/usr/bin/env node

const mysql   = require('mysql');
const express = require('express');
const app     = express();
const port    = 8080;
const con_db  = mysql.createConnection({
	host: 'localhost',
	user: 'leaf_eye',
	password: 'leaf_eye',
	database: 'leaf_eye',
	timezone: 'jst'
});

con_db.connect();


app.get('/leaf-eye/api/v0/temperature', function(req, res) {
	var query = 'select timestamp, temperature from data order by timestamp desc limit 10;';

	con_db.query(query, (err, rows, fields) => {
		if (err) {
			console.log('err: ', err);
		}


				
		array = []
		for (i in rows) {
			var row = {timestamp: rows[i].timestamp, temperature: rows[i].temperature};

			array.push(row)
		}

		var data = {"temperature": array}
		res.header('content-type', 'application/json; charset=utf-8');
		res.json(data)
	});
		
});


app.get('/leaf-eye/api/v0/humidity', function(req, res) {
	var query = 'select timestamp, humidity from data order by timestamp desc limit 10;';
	con_db.query(query, (err, rows, fields) => {
		if (err) {
			console.log('err: ', err);
		}
				
		array = []
		for (i in rows) {
			var row = {timestamp: rows[i].timestamp, humidity: rows[i].humidity};
			array.push(row)
		}

		var data = {"humidity": array}
		res.header('content-type', 'application/json; charset=utf-8');
		res.json(data)
	});
		
});


app.get('/leaf-eye/api/v0/pressure', function(req, res) {
	var query = 'select timestamp, pressure from data order by timestamp desc limit 10;';
	con_db.query(query, (err, rows, fields) => {
		if (err) {
			console.log('err: ', err);
		}
				
		array = []
		for (i in rows) {
			var row = {timestamp: rows[i].timestamp, pressure: rows[i].pressure};
			array.push(row)
		}

		var data = {"pressure": array}
		res.header('content-type', 'application/json; charset=utf-8');
		res.json(data)
	});
		
});


app.listen(port);

