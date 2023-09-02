export interface IRateLimiter {
  execute(name: string, weight: number): Promise<any>;
}
