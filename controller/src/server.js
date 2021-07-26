const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api/api.routes');

const port = process.env.PORT || 8081;
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extend: false}))
  .use(api());


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
