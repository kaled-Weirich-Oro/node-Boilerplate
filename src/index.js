import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import importDir from "../utils/importDir";
import setHeaders from './middlewares/SetHeaders';
import routes from "../utils/routes";
import {resolve} from 'path';

dotenv.config();
const koa = new Koa;
const PORT = process.env.PORT || 8080; // dotenv

koa.use(setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': true
  }));
  
  koa.use(bodyParser());
  importDir(resolve(__dirname, 'routes'))
    .then(routes('router'))
    .then(router => koa
      .use(router.routes())
      .use(router.allowedMethods()))
    .then(() => console.log('Routes loaded on port ' + PORT));
  
  koa.listen(PORT);