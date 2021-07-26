const express = require('express')
const request = require('../api/request_builder/request_builder');

const getHealthCheck = (req, res, next) => {
  res.status(200).send({"status": "up"});
}

module.exports = (router = express.Router()) => {
  router.get('/', getHealthCheck);

  return router;
}
