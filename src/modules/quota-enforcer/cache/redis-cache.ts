import { CacheAbstract } from "../../../core/types/cache.abstract";
import ioredis from "ioredis";

export class RedisCache implements CacheAbstract {
  cache: ioredis;
  constructor(public readonly host: string, public readonly port: number) {
    this.cache = new ioredis(port, host);
  }

  async cleanup() {
    try {
      console.log("redis cleanup");
      const keys = await this.cache.keys("rate:*");
      console.log(keys);
      this.cache.del(...keys);
      console.log("redis cleanup:done");
    } catch (err) {
      // silent error
    }
  }

  setWeight(name: string, weight: number): void {
    this.cache.set(`rate:${name}`, `${weight}`);
  }
  async getWeight(name: string): Promise<number | undefined> {
    const val = await this.cache.get(`rate:${name}`);
    return val ? +val : 0;
  }
}
