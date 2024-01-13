import { filter } from "rxjs";
import { generateRandomString } from "../../../core/util/get-random-string";
import commandBus from "../event-bus/command-bus";
import { CommandBusObserver } from "../event-bus/command-bus-observer";
import responseBus from "../event-bus/response-bus";
import { ScheduledMethodOptions } from "../../../core/types/async-function.options";

type AsyncMethod<T> = (...args: any[]) => Promise<any>;

class WrapperClass {
  constructor(private readonly obj, private id: string) {}
  get get() {
    return this.obj;
  }
}

const objMap: Record<string, WrapperClass> = {};

export function ScheduledMethod(options?: ScheduledMethodOptions) {
  return function asyncDecorator<T>(
    target: any,
    key: string,
    descriptor: TypedPropertyDescriptor<AsyncMethod<any>>
  ) {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error(`The asyncDecorator can only be applied to methods.`);
    }
    const uniqueName =
      `fn:${target.constructor.name}:${key}`.toLocaleLowerCase();

    const observer = new CommandBusObserver(originalMethod, options);
    commandBus.pipe(filter((x) => x.name == uniqueName)).subscribe(observer);

    target["_observer_" + uniqueName] = observer;

    descriptor.value = async function (...args) {
      // Perform any pre-execution logic here
      const objId = this["__id__"];

      const rnd = generateRandomString(32);
      commandBus.next({
        classId: objId,
        name: uniqueName,
        payload: args,
        object: this,
        code: rnd,
      });

      const getResponse = new Promise((resolve) => {
        responseBus.pipe(filter((x) => x.code == rnd)).subscribe((x) => {
          resolve(x.payload);
        });
      });

      const result = await getResponse;
      // Perform any post-execution logic here
      return result;
    };

    return descriptor;
  };
}
