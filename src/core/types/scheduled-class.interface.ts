import { IRateLimiter } from "./rate-limiter.interface";
import { ScheduledClassOptions } from "./scheduled-class.options";
import { RuntimeExecutionContext } from "./runtime-execution-context";

export interface IScheduledClass {
  __id__: string;
  get __get_execution_context(): RuntimeExecutionContext;
  get __get_class_options(): ScheduledClassOptions;
  get __get_cache(): IRateLimiter;
}
