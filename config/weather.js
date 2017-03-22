/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */
module.exports = {

  /**
   * Weather Underground API Key
   * 
   * Can be specified either via an Environment variable or here in the config
   * 
   * Get yours at https://www.wunderground.com/weather/api
   */
  wunderground_key: process.env.WUNDERGROUND_KEY || '',

  /**
   * How long should we cache weather results?
   * Defaults to 1 hour
   * Units are seconds
   */
  wunderground_cache_timeout: 60 * 60,
}
