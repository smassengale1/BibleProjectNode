const express = require('express')
const request = require('../api/request_builder/request_builder');

const getHealthCheck = (req, res, next) => {
  res.status(200).send({"status": "up"});
}

const getUnxrefedVerses = (req, res, next) => {
  var url = `${api}/verse/type/unxrefed`;
  console.log("GET " + url)
  request.get(`${api}/verse/type/unxrefed`, req)
    .then(result => res.status(result.statusCode).send(result.body))
    .catch(next);
}



const api = "http://localhost:8080/api";
module.exports = (router = express.Router()) => {
  router.get('/api/verse/type/unxrefed', getUnxrefedVerses);

  return router;
}
