import { ScheduledClass, ScheduledMethod } from "../src/index";

@ScheduledClass({
  interval: {
    cache: { host: "127.0.0.1", port: 6379 },
    duration: 3,
    maxWeight: 200,
    size: "SECOND",
  },
})
class TestClass {
  start() {
    this.function1();
  }
  @ScheduledMethod({ name: "method1", weight: 5 })
  async function1() {
    console.log("execution of function 1");
    this.function2();
  }

  @ScheduledMethod({ name: "method2", weight: 195 })
  async function2() {
    console.log("execution of function 2");
    this.function3();
  }

  @ScheduledMethod({ name: "method3", weight: 200 })
  async function3() {
    console.log("execution of function 3");
    process.exit(0);
  }
}

new TestClass().start();
