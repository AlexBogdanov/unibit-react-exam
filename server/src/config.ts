import path from 'path';
import * as dotenv from 'dotenv';

(() => {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
})();

export default class Config {

  static #instance: Config;

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new Config();
    }

    return this.#instance;
  }

  // Database
  clusterUri = process.env.CLUSTER_URI_LOCAL || '';
  database = 'ure-dev';

  // Server
  server = {
    port: 8080,
  };

  // JWT
  jwtSecret = process.env.JWT_SECRET || '';

}
