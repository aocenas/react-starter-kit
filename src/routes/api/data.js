/* global Promise */
const express = require('express');
const router = express.Router();

export function getData (req, res) {
    res.json({});
}

router
    .route('/data')
    .get(getData);

export default router;





