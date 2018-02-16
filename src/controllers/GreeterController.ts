import {
  interfaces,
  getRouteInfo,
  InversifyExpressServer,
  request,
  response,
  next,
  TYPE,
  queryParam,
  controller,
  requestParam,
  httpGet,
  requestBody
} from 'inversify-express-utils';

import { Container, injectable, inject } from 'inversify';
import Greeter from '../services/contracts/greeter';

@controller('/')
export default class GreeterController {
  constructor(@inject('HelloWorld') private helloWorldService: Greeter) {}

  @httpGet('hello/:name')
  public sayHelloWorld(@requestParam('name') name: string): string {
    return this.helloWorldService.greet(name);
  }
}
