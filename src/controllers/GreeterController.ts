import {
  controller,
  requestParam,
  httpGet
} from 'inversify-express-utils';

import { inject } from 'inversify';
import Greeter from '../services/contracts/greeter';
import HelloGreeterService from '../services/implementations/hello-greeter';

@controller('/')
export default class GreeterController {
  constructor(@inject(HelloGreeterService) private helloGreeterService: Greeter) {}

  @httpGet('hello/:name')
  public sayHello(@requestParam('name') name: string): string {
    return this.helloGreeterService.greet(name);
  }
}
