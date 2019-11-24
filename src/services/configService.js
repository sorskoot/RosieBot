const config = require('electron-json-config');

/**
 * Service for working with the configuration
 */
class ConfigService {
  
    /**
     * Loads all the configuration from disk (local appdata)
     * @returns Returns a promise containing the config.
     */
    loadConfig() {
        return new Promise((res, rej) => {
            try {
                res(config.all());
            } catch (err) {
                rej(err);
            }
        })
    }
}


/**
 * Export default of the service
 */
export default new ConfigService();