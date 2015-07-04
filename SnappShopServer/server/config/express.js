var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    busboy = require('connect-busboy'),
    passport = require('passport'),
    morgan = require('morgan');

module.exports = function(app, config) {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(busboy({immediate: false}));
    app.use(session({secret: 'some secret', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + 'public'));
    app.use(morgan('combined'));
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
        return;
    });
};