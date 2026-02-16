const logger = {
  log: function(msg) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(msg);
    }
  }
};

export default logger;