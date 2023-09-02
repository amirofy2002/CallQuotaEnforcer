export abstract class CacheAbstract {
  abstract setWeight(name: string, weight: number): void;
  abstract getWeight(name: string): number | undefined;
}
