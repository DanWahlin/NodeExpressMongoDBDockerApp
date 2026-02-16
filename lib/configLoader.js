import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import logger from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let env = process.env.NODE_ENV;

if (!env) {
  env = 'development';
} 

logger.log('Node environment: ' + env);
logger.log('loading config.' + env + '.json');

const configPath = path.join(__dirname, '..', 'config', `config.${env}.json`);
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

export default config;