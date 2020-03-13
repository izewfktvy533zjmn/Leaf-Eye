#!/usr/bin/env node

const express = require('express');

const router = express.Router();
router.use('/temperature', require('./temperature.js'));
router.use('/humidity',    require('./humidity.js'));
router.use('/pressure',    require('./pressure.js'));

module.exports = router;

