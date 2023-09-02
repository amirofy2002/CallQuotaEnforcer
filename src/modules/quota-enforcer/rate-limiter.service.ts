import { Injectable } from "@nestjs/common";
import { interval } from "rxjs";
import { CacheAbstract } from "../../core/cache/core/cache.abstract";
@Injectable()
export class RateLimiterService {
  cacheKey = `c`;
  constructor(
    private name: string,
    private intevalMS: number,
    private weight: number,
    private cache: CacheAbstract
  ) {
    this.cacheKey = `c_${this.name}`;
    interval(intevalMS).subscribe(() => this.reset());
  }

  execute(title: string, weight: number) {
    const interval10ms = interval(1);
    return new Promise((resolve) => {
      const subscribeId = interval10ms.subscribe(() => {
        const maxUsed = this.cache.getWeight(this.cacheKey) ?? 0;
        if (maxUsed + weight <= this.weight) {
          this.cache.setWeight(this.cacheKey, maxUsed + weight);
          subscribeId.unsubscribe();
          resolve(true);
        }
      });
    });
  }

  reset() {
    this.cache.setWeight(this.cacheKey, 0);
  }
}
