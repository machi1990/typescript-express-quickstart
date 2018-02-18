import 'reflect-metadata';

import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { Container } from 'inversify';
import Greeter from './services/contracts/greeter';
import GreeterController from './controllers/GreeterController';
import HelloGreeterService from './services/implementations/hello-greeter';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as prettyjson from 'prettyjson';
import * as morganLogger from 'morgan';
import * as cookieParser from 'cookie-parser';

const container = new Container();
container.bind<GreeterController>(GreeterController).to(GreeterController);
container.bind<Greeter>(HelloGreeterService).to(HelloGreeterService);

const router = express.Router({
  caseSensitive: false,
  mergeParams: false,
  strict: false
});

let server = new InversifyExpressServer(container, router, {
  rootPath: '/api/v1/'
});

server.setConfig(app => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    })
  );

  app.use(
    bodyParser.json({
      inflate: true,
      limit: '50mb'
    })
  );

  app.use(cookieParser());
  app.use(morganLogger('dev'));
});

server.setErrorConfig(app => {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
});

const app = server.build();
app.listen(3000);

const routeInfo = getRouteInfo(container);

console.log(prettyjson.render({ routes: routeInfo }));

module.exports = app;
