const express = require('express');

const router = express.Router();

const getUserDateInTimezone = offsetInHours => {
  const utcDate = Date.now();
  return new Date(utcDate);
};

router.get('/', (request, response) => {
  const {timezone = 0} = request.query;
  
  const userDateInTimezone = getUserDateInTimezone(timezone);
  var isoTime = userDateInTimezone.toISOString();
  // userDateInTimezone
  var arr = isoTime.split('.');
  var end_time = arr[0];
  const dateObject = {
    day: userDateInTimezone.getDate(),
    month: userDateInTimezone.getMonth() + 1,
    year: userDateInTimezone.getFullYear(),
    hours: userDateInTimezone.getHours(),
    minutes: userDateInTimezone.getMinutes(),
    seconds: userDateInTimezone.getSeconds(),
    start_time: isoTime,
    end_time: end_time,
    unknoow: userDateInTimezone.setDate(userDateInTimezone.getDate + 7)
  };
    
  const userAttributes = {
    set_attributes: dateObject
  };
  
  response.json(userAttributes);
});


module.exports = router;
