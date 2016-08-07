const express = require('express');
import dataApi from './data';

const router = express.Router();

router.use(dataApi);
// ... other API

module.exports = (app) => app.use('/api/v0', router);


