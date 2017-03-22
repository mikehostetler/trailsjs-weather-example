jQuery(function ($) {
  'use strict';

  var WEATHER_URL = '/weather/';

  /**
   * Set up Loading indicator
   */
  var $loading = $('forecast-loading');
  $( document )
    .ajaxStart(function() {
      $loading.show(); 
    })
    .ajaxComplete(function() {
      $loading.hide(); 
    });

  /**
   * Function to get JSON
   */
  function getForecastByZip(zip,cb,err_cb) {
    $.ajax({
      dataType: "json",
      type: 'GET',
      url: WEATHER_URL + zip,
      success: function(data) {
        cb(data);
      },
      error: function(err) {
        err_cb(err);
      }
    });
  }

  /**
   * Override form submission, add validation
   */
  $('#forecast-form').validator().on('submit', function() {
    var zip = $('#zip').val();
    getForecastByZip(zip,function(forecast) {
      var days = forecast.txt_forecast.forecastday.slice(0,3);
      var $forecast = $('#forecast');
      $forecast.empty().append('<h3>Weather Forecast for '+zip+'</h3>');
      $.each(days,function(k, day) {
        $forecast.append('<div class="col-xs-6 col-md-4">'+
                '<strong>'+day.title+'</strong>'+
                '<div>'+
                  '<img src="'+day.icon_url+'" />'+
                '</div>'+
                '<span>'+day.fcttext+'</span>'+
              '</div>');
      });
    },function(error) {
      $('#forecast').empty().append('There was an error with your request.  Please enter a different zip code and try again');

    });

    return false;
  });
});
