const promiseRequest = require('request-promise');
const request = require('request');
const _ = require('lodash');

function requestBuilder(options, req) {

  const requestOptions = {
    simple: false,
    json: true,
    resolveWithFullResponse: true,
    ...options,
  };

  const defaultHeaders = {
    Authorization: req.headers['authorization'],
  };

  requestOptions.headers = _.defaults(defaultHeaders);

  return requestOptions;
}

function request_builder(options, req) {
  const requestOptions = requestBuilder(options, req);

  return promiseRequest(requestOptions);
}




request_builder.get = (url, req) => request_builder({ url: url, method: 'GET' }, req);
request_builder.post = (url, req, body) => request_builder({url: url, method: 'POST', body:body }, req);
request_builder.put = (url, req, body) => request_builder({url: url, method: 'PUT', body:body }, req);
request_builder.delete = (url, req, body) => request_builder({url: url, method: 'DELETE', body:body }, req);

module.exports = request_builder;
