import { CacheAbstract } from "./core/cache.abstract";
import NODECACHE from "node-cache";

export class MemoryCache implements CacheAbstract {
  cache = new NODECACHE();

  setWeight(name: string, weight: number): void {
    this.cache.set(name, weight);
  }
  getWeight(name: string): number | undefined {
    return this.cache.get<number>(name);
  }
}
