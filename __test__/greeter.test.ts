import 'reflect-metadata';
import HelloWorldService from '../src/services/implementations/hello-world';
import Greeter from '../src/services/contracts/greeter';
import GreeterController from '../src/controllers/GreeterController';
import { mock, instance, verify, when, anyString, resetCalls } from 'ts-mockito';

describe('Hello World', () => {
  test('When empty should say Hello', () => {
    expect(new HelloWorldService().greet('')).toBe('Hello ');
  });

  test("When ’Manyanda ' should say Hello Manyanda", () => {
    expect(new HelloWorldService().greet('Manyanda')).toBe('Hello Manyanda');
  });
});

describe('Greater Controller', () => {
  let mockedHelloWorld: HelloWorldService, helloWorld: HelloWorldService;

  beforeAll(() => {
    mockedHelloWorld = mock(HelloWorldService);
    helloWorld = instance<HelloWorldService>(mockedHelloWorld);

    when(mockedHelloWorld.greet(anyString())).thenCall(name => {
      return name;
    });
  });

  afterEach(() => {
    resetCalls(mockedHelloWorld);
  });

  test('When sayHelloWorld called, then greet service called', () => {
    new GreeterController(helloWorld).sayHelloWorld('');
    verify(mockedHelloWorld.greet('')).called();
  });

  test("Controller's sayHelloWorld sends the message it receives.", () => {
    const greeting = new GreeterController(helloWorld).sayHelloWorld('Manyanda');
    expect(greeting).toBe('Manyanda');
  });
});
