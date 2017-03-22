'use strict'
var moment = require('moment');

var Wunderground = require('wundergroundnode');
let wunderground = null;

const Service = require('trails/service');

/**
 * @module WeatherService
 * @description Grab weather data for a Zip Code
 */
module.exports = class WeatherService extends Service {
  /**
   * Connect to the Weather Underground API
   */
  connectToWunderground() {
    // Check if we have a valid key
    if(this.app.config.weather.wunderground_key === null) {
      return new Error('Undefined Weather Underground Token');
    }

    // Connect
    if(!wunderground) {
      wunderground = new Wunderground(this.app.config.weather.wunderground_key);
    }

    return wunderground;
  }
  /**
   * Update the Forecast in the Database
   */
  persistForecast (zip, forecast, cb) {
    var doc = {'zip': zip, 'data': forecast};
    this.app.orm.WeatherForecast.findOneAndUpdate({'zip': zip}, doc, {'new': true, 'upsert': true}, function(err, doc) {
      if (err) {
        cb(err, doc.data);
      }

      cb(false, doc.data);
    });
  }

  /**
   * Fetch & persist our forecast
   * 
   */
  fetchForecast (zip, cb) {
    var weather = this.connectToWunderground();
    var self = this;
    weather.forecast().request(zip, function(err, res) {
      if(err) {
        cb(err, []);
        return;
      }

      if(res.response.error) {
        return cb(res.response.error.description,[]);
      }
      else {
        self.persistForecast(zip, res.forecast, cb)
      }
    });
  }

  /**
   * Query the weather from Weather Underground by Zip Code
   */
  getWeatherByZip (zip, cb) {
    var self = this;
    var expired = moment().subtract(this.app.config.weather.wunderground_cache_timeout,'seconds').toDate();

    var query = {'zip': zip, 'updatedAt': {$gte: expired}};
    this.app.orm.WeatherForecast.findOne(query, function(err, forecast) {
      if (err) {
        cb(err, forecast.data);
      }

      if(!forecast) {
        // No forecast returned, fetch it
        self.fetchForecast(zip, cb);
      }
      else {
        // Found our forecast, return it
        cb(false, forecast.data);
      }
    });  
  }
}
