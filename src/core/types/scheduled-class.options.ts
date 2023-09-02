import { CacheAbstract } from "../cache/core/cache.abstract";

export type ScheduledClassOptions = {
  interval: {
    duration: number;
    size: "HOUR" | "MINUTE" | "SECOND";
    maxWeight: number;
    cache: CacheAbstract;
  };
};
