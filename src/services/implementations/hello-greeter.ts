import { injectable } from 'inversify';
import Greeter from '../contracts/greeter';

@injectable()
export default class HelloGreeterService implements Greeter {
  greet(name: string): string {
    return `Hello ${name}`;
  }
}
