'use strict'

const Model = require('trails/model')

/**
 * @module WeatherForecast
 * @description Weather Forecast Lookup
 */
module.exports = class WeatherForecast extends Model {

  static schema (app, Mongoose) {
    return { 
      zip: {
        type: String,
        unique: true
      },
      data: {
        type: Object,
      } 
    }
  }

  static config (app, Mongoose) {
    return {
      tableName: 'weatherforecast',
    
      // Schema options
      schema: {
        timestamps: true,

        versionKey: false,

        toObject: {
          virtuals: true
        },

        toJSON: {
          virtuals: true
        }
      }
    }
  }
}
