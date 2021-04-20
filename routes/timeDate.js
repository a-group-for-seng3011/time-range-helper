const express = require('express');

const router = express.Router();

const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

const getUserDateInTimezone = offsetInHours => {
  const utcDate = Date.now();
  
  const offsetInMilliseconds = ONE_HOUR_IN_MILLISECONDS * offsetInHours;
  
  return new Date(utcDate + offsetInMilliseconds);
};

router.get('/', (request, response) => {
  const {timezone = 0} = request.query;
  
  const userDateInTimezone = getUserDateInTimezone(timezone);
  var isoTime = userDateInTimezone.toISOString();
  var arr = isoTime.split('.');
  var end_time = arr[0];
  const dateObject = {
    day: userDateInTimezone.getDate(),
    month: userDateInTimezone.getMonth() + 1,
    year: userDateInTimezone.getFullYear(),
    hours: userDateInTimezone.getHours(),
    minutes: userDateInTimezone.getMinutes(),
    seconds: userDateInTimezone.getSeconds(),
    start_time: end_time,
    end_time: end_time
  };
    
  const userAttributes = {
    set_attributes: dateObject
  };
  
  response.json(userAttributes);
});


module.exports = router;
