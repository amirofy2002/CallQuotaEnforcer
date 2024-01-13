import { CacheAbstract } from "../../../core/types/cache.abstract";
import NODECACHE from "node-cache";

export class MemoryCache implements CacheAbstract {
  async cleanup(): Promise<void> {
    console.log("memory cleanup");
  }
  cache = new NODECACHE();

  setWeight(name: string, weight: number): void {
    this.cache.set(name, weight);
  }
  getWeight(name: string): number | undefined {
    return this.cache.get<number>(name);
  }
}
