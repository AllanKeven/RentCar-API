require("./instrument");
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');

const Sentry = require("@sentry/node");
const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const port = 3001;

const cors = require('cors');


app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(cors());
app.use('/api', routes);

/*
  EXEMPLO DO ERRO DO SENTRY

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
  
*/

Sentry.setupExpressErrorHandler(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

