import 'reflect-metadata';
import HelloGreeterService from '../src/services/implementations/hello-greeter';
import Greeter from '../src/services/contracts/greeter';
import GreeterController from '../src/controllers/GreeterController';
import { mock, instance, verify, when, anyString, resetCalls } from 'ts-mockito';

describe('Hello World', () => {
  test('When empty should say Hello', () => {
    expect(new HelloGreeterService().greet('')).toBe('Hello ');
  });

  test("When ’Manyanda ' should say Hello Manyanda", () => {
    expect(new HelloGreeterService().greet('Manyanda')).toBe('Hello Manyanda');
  });
});

describe('Greater Controller', () => {
  let mockedHelloGreeter: HelloGreeterService, helloGreeter: HelloGreeterService;

  beforeAll(() => {
    mockedHelloGreeter = mock(HelloGreeterService);
    helloGreeter = instance<HelloGreeterService>(mockedHelloGreeter);

    when(mockedHelloGreeter.greet(anyString())).thenCall(name => {
      return name;
    });
  });

  afterEach(() => {
    resetCalls(mockedHelloGreeter);
  });

  test('When sayHello called, then greet service called', () => {
    new GreeterController(helloGreeter).sayHello('');
    verify(mockedHelloGreeter.greet('')).called();
  });

  test("Controller's sayHelloWorld sends the message it receives.", () => {
    const greeting = new GreeterController(helloGreeter).sayHello('Manyanda');
    expect(greeting).toBe('Manyanda');
  });
});
