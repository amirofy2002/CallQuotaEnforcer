import { CacheAbstract } from "./cache.abstract";

export type RedisCacheOptions = {
  host: string;
  port: number;
};

export type CacheSettings = any extends RedisCacheOptions
  ? RedisCacheOptions
  : "MEMORY";

export type ScheduledClassOptions = {
  interval: {
    duration: number;
    size: "HOUR" | "MINUTE" | "SECOND";
    maxWeight: number;
    cache: CacheSettings;
  };
};
