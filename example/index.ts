import { ScheduledClass, ScheduledMethod } from "../src/index";

@ScheduledClass({
  interval: {
    cache: "MEMORY",
    duration: 3,
    maxWeight: 200,
    size: "SECOND",
  },
})
class TestClass {
  @ScheduledMethod({ name: "method1", weight: 5 })
  async function1() {
    console.log("execution of function 1");
  }

  @ScheduledMethod({ name: "method2", weight: 200 })
  async function2() {
    console.log("execution of function 2");
    this.function3();
  }

  function3() {
    console.log("execution of function 3");
  }
}
