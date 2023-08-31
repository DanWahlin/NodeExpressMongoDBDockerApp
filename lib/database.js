'use strict';
var mongoose = require('mongoose');

var database = function () {
    var conn = null,

        init = (config) => {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            var options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };

            var connString = `mongodb://${config.host}/${config.database}`;
            mongoose.connect(connString, options);
            conn = mongoose.connection;
            conn.on('error', console.error.bind(console, 'connection error:'));
            conn.once('open', () => console.log('db connection open'));
            return conn;
        },

        close = () => {
            if (conn) {
                conn.close(() => {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;
