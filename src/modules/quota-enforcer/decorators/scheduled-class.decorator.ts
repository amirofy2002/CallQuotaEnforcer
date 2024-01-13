import { RateLimiterService } from "../rate-limiter.service";
import { IRateLimiter } from "../../../core/types/rate-limiter.interface";
import { RuntimeExecutionContext } from "../../../core/types/runtime-execution-context";
import { IScheduledClass } from "../../../core/types/scheduled-class.interface";
import { ScheduledClassOptions } from "../../../core/types/scheduled-class.options";
import { SCHEDULED_CLASS_SYMBOLS } from "../../../core/types/symols";
import { generateRandomString } from "../../../core/util/get-random-string";
import { MemoryCache } from "../cache/memory-cache";
import { RedisCache } from "../cache/redis-cache";

export function ScheduledClass(options: ScheduledClassOptions) {
  return function afterObjectCreation<T extends { new (...args: any[]): {} }>(
    target: T
  ) {
    const originalConstructor = target;

    return class extends originalConstructor implements IScheduledClass {
      __id__ = generateRandomString(32);
      constructor(...args: any[]) {
        super(...args);
        this.____init___();
      }

      ____init___() {
        const cache =
          options.interval.cache == "MEMORY"
            ? new MemoryCache()
            : new RedisCache(
                options?.interval?.cache?.host,
                options?.interval?.cache?.port
              );
        process.on("SIGINT", async () => {
          console.log("cleaning up");
          await cache.cleanup();
          process.exit(0);
        });

        this["test"] = "qq";
        this[SCHEDULED_CLASS_SYMBOLS.OPTIONS] = options;
        this[SCHEDULED_CLASS_SYMBOLS.EXECUTION_CONTEXT] = {};
        this[SCHEDULED_CLASS_SYMBOLS.EXECUTION_CACHE] = new RateLimiterService(
          this.__id__,
          this.___getDuration(),
          options.interval.maxWeight,
          cache
        );
      }

      get __get_execution_context() {
        return this[
          SCHEDULED_CLASS_SYMBOLS.EXECUTION_CONTEXT
        ] as RuntimeExecutionContext;
      }

      get __get_class_options() {
        return this[SCHEDULED_CLASS_SYMBOLS.OPTIONS] as ScheduledClassOptions;
      }
      get __get_cache(): IRateLimiter {
        return this[SCHEDULED_CLASS_SYMBOLS.EXECUTION_CACHE] as IRateLimiter;
      }
      ___getDuration() {
        const durationMap = {
          SECOND: () => options.interval.duration * 1000,
          MINUTE: () => options.interval.duration * 60 * 1000,
          HOUR: () => options.interval.duration * 60 * 60 * 1000,
        };
        return durationMap[options.interval.size]();
      }
    };
  };
}
