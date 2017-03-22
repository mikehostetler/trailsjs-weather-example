'use strict'

const Controller = require('trails/controller')

var zippo = require('zippo');
var boom = require('boom');

/**
 * @module WeatherController
 * @description Report the Weather!.
 */
module.exports = class WeatherController extends Controller {
  
  /**
   * Return the 3 day forecast for a zip code
   *
   * @param zip   Five digit Zip code, may start with a zero
   **/
  getForecastByZip (request, reply) {
    const { zip }   = request.params;

    if(zippo.validate (zip) !== true) {
      return reply(boom.badRequest('Invalid Zip Code'))
    }

    this.app.services.WeatherService.getWeatherByZip(zip, function(err, res) {
      if(err) {
        reply(boom.badRequest(err));
      }
      else {
        reply(res);
      }
    })
  }
}

