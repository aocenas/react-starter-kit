// @flow
const path = require('path');
const express = require('express');

module.exports = function configureStaticServer (app: Object) {
    app.use('/static', express.static(path.join(__dirname, '../../public'), { maxAge: 31557600000 }));
};


