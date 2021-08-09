const express = require('express')
const request = require('../api/request_builder/request_builder');

const getHealthCheck = (req, res, next) => {
  res.status(200).send({"status": "up"});
}

const getVerses = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)

  const queryParams =
    `?testament=${req.query.testament}&verseTypes=${req.query.verseTypes}&completed=${req.query.completed}&limit=${req.query.limit}`;
  request.get(`${api}/verse${queryParams}`, req)
    .then(result => res.status(result.statusCode).send(result.body))
    .catch(next);
}

const getVerseTypes = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)

  request.get(`${api}/verse/types`, req)
    .then(result => res.status(result.statusCode).send(result.body))
    .catch(next);
}



const updateVerseXref = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  request.put(`${api}/verse/types/`, req, req.body)
    .then(result => res.status(result.statusCode).send(result.body))
    .catch(next);
}



const api = "http://localhost:8080/api";
module.exports = (router = express.Router()) => {
  router.get('/api/verse/', getVerses);
  router.get('/api/verse/types', getVerseTypes);
  router.put('/api/verse/type', updateVerseXref);

  return router;
}
