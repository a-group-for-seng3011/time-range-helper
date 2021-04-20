const express = require('express');

const router = express.Router();

const getUserDateInTimezone = offsetInHours => {
  const utcDate = Date.now();
  return new Date(utcDate);
};

router.get('/', (request, response) => {
  const {timezone = 0} = request.query;
  
  const userDateInTimezone = getUserDateInTimezone(timezone);
  
  var date = new Date();
  var pastDate = date.getDate() - 7;
  date.setDate(pastDate);
  var isoTime1 = date.toISOString();
  var arr1 = isoTime1.split('.');
  var start_time = arr1[0];
  
  var isoTime2 = userDateInTimezone.toISOString();
  var arr2 = isoTime2.split('.');
  var end_time = arr2[0];
  const dateObject = {
    day: userDateInTimezone.getDate(),
    month: userDateInTimezone.getMonth() + 1,
    year: userDateInTimezone.getFullYear(),
    hours: userDateInTimezone.getHours(),
    minutes: userDateInTimezone.getMinutes(),
    seconds: userDateInTimezone.getSeconds(),
    start_interval_time: start_time,
    end_interval_time: end_time,
  };
    
  const userAttributes = {
    set_attributes: dateObject
  };
  
  response.json(userAttributes);
});


module.exports = router;
