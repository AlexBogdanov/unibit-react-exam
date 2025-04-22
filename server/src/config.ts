import * as dotenv from 'dotenv';
import path from "path";

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

  clusterUri = process.env.CLUSTER_URI_LOCAL || '';

  server = {
    port: 8080,
  };

}
