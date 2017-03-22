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
        console.log('Error when querying Weather Undergorund!');
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
    console.log('Find forecast for zip '+zip);
    this.app.orm.WeatherForecast.findOne(query, function(err, forecast) {
      console.log('Fetching findOne Forecast for zip' +zip);
      if (err) {
        console.log('Error 1?');
        cb(err, forecast.data);
      }

      if(!forecast) {
        // No forecast returned, fetch it
        //console.log('New Forecast! Fetch');
        self.fetchForecast(zip, cb);
      }
      else {
        // Found our forecast, return it
        //console.log('Found our forecast in the cache');
        cb(false, forecast.data);
      }
    });  
  }
}
