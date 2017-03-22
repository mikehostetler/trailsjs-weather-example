# Trails.js Example Weather Forecast

[![Gitter][gitter-image]][gitter-url]
[![Follow @trailsjs on Twitter][twitter-image]][twitter-url]

Example Trails.js application demonstrating the use of a
[service](https://trailsjs.io/doc/en/build/service) to fetch
weather data by US zip code, cache the results and report those to the front
end.

## 1. Pre-requisities

### a. Install Node.js

Learn how to [install Node.js](https://nodejs.org/en/download/) for your system.

### a. Install MongoDB

Learn how to [install MongoDB](https://docs.mongodb.com/manual/installation/) for your system.

## 2. Clone & Install

```sh
$ mkdir weather-example

$ git clone $repository weather-example

$ cd weather-example

$ npm install
```

## 3. Configure

### a. Set your environment.

This is an example application and is designed to run in development mode.

There are several configuration options for Trails.js that may be configured via
environment variables or by modifying values in their respective config files.

| Config Name | default | description |
|:---|:---|:---|
| `WUNDERGROUND_KEY` | `` | _Required_ API Key for Weather Underground |
| `HOST` | `0.0.0.0` | Host to run the webserver on. |
| `PORT` | `3000` | Port to run the webserver on. |
| `DB_HOST` | `localhost` | MongoDB database server host |
| `DB_PORT` | `27017` | MongoDB database server port |
| `DB_NAME` | `trailsjs` | MongoDB database server host |

### b. Grab a Weather Underground API Key

Navigate to [Weather Underground](https://www.wunderground.com/weather/api), 
register for a free developer account and grab an API key.

Modify `config/weather.js` and add your Weather API key.

## 4. Start!

```sh
$ npm start
```

### Navigate to [http://localhost:3000](http://localhost:3000) (default url) and get your weather!

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trails/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

[trails-image]: http://i.imgur.com/zfT2NEv.png
[trails-url]: http://trailsjs.io
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails
[twitter-image]: https://img.shields.io/twitter/follow/trailsjs.svg?style=social
[twitter-url]: https://twitter.com/trailsjs
