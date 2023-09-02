export type ScheduledClassOptions = {
  interval?: {
    duration: number;
    size: "HOUR" | "MINUTE" | "SECOND";
    maxWeight: number;
  };
};
