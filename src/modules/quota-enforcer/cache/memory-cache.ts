import { CacheAbstract } from "../../../core/types/cache.abstract";
import NODECACHE from "node-cache";
import { ScheduledClass } from "../decorators/scheduled-class.decorator";

export class MemoryCache implements CacheAbstract {
  cache = new NODECACHE();

  setWeight(name: string, weight: number): void {
    this.cache.set(name, weight);
  }
  getWeight(name: string): number | undefined {
    return this.cache.get<number>(name);
  }
}
