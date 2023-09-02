import { Observer } from "rxjs";
import responseBus from "./response-bus";
import { Command } from "../../../core/types/Command";
import { ScheduledMethodOptions } from "../../../core/types/async-function.options";
import { IScheduledClass } from "../../../core/types/scheduled-class.interface";

export class CommandBusObserver implements Observer<Command> {
  constructor(
    private readonly func: Function,
    private readonly options?: ScheduledMethodOptions
  ) {}
  async next(command: Command) {
    this.execute(command);
  }
  error(err: any) {
    console.error({ err: err?.message });
  }
  complete() {}

  private getRateLimiter(context: IScheduledClass) {
    return context.__get_cache;
  }

  private async execute({ code, name, object, payload }: Command) {
    const cache = this.getRateLimiter(object);
    await cache.execute(name, this.options?.weight ?? 1);
    const response = await this.func.apply(object, payload);
    responseBus.next({ code: code, payload: response });
  }
}
