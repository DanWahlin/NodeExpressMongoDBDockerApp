import dataInitializer from './lib/dataSeeder.js';
import config from './config/config.development.json' with { type: 'json' };
import db from './lib/database.js';

db.init(config.databaseConfig);

console.log('Initializing Data');
dataInitializer.initializeData(function(err) {
  if (err) {
      console.log(err);
  }
  else {
      console.log('Data Initialized!')
  }
});