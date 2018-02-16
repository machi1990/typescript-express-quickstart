import {
  controller,
  requestParam,
  httpGet
} from 'inversify-express-utils';

import { inject } from 'inversify';
import Greeter from '../services/contracts/greeter';
import HelloWorldService from '../services/implementations/hello-world';

@controller('/')
export default class GreeterController {
  constructor(@inject(HelloWorldService) private helloWorldService: Greeter) {}

  @httpGet('hello/:name')
  public sayHello(@requestParam('name') name: string): string {
    return this.helloWorldService.greet(name);
  }
}
