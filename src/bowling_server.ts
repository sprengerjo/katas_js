import * as express from 'express';
import * as bodyParser from 'body-parser';

import {pathOr} from 'ramda'
import {score} from './bowling_score_calculator';

export const server = new Promise((resolve) => {

  const app = express();
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies


  app.post('/scores', (req, res) => {
    const rolls = pathOr([], ['body', 'rolls'], req);
    const scoreResponse = score(rolls);

    res.send(scoreResponse.toString());
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listining to port: ${port}`);
    resolve(void 0);
  });
});