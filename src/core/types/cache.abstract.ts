export abstract class CacheAbstract {
  abstract setWeight(name: string, weight: number): void;
  abstract getWeight(
    name: string
  ): Promise<number | undefined> | number | undefined;
  abstract cleanup(): Promise<void>;
}
