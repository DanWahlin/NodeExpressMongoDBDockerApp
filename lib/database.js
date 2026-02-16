import mongoose from 'mongoose';

const database = {
  conn: null,

  init: function(config) {
    console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
    const connString = `mongodb://${config.host}/${config.database}`;
    mongoose.connect(connString);
    this.conn = mongoose.connection;
    this.conn.on('error', console.error.bind(console, 'connection error:'));
    this.conn.once('open', () => console.log('db connection open'));
    return this.conn;
  },

  close: function() {
    if (this.conn) {
      this.conn.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    }
  }
};

export default database;
