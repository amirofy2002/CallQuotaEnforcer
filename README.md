# CallQuotaEnforcer

Enforce quota for calling external services

# What is was the problem, what is supposed to be resolved?

In certain situations, you may find it necessary to have control over the way you call external services. To address this, it becomes important to manage the frequency of your calls to these external servers. This package aims to provide a seamless solution to help you effectively manage and control your calls to external services without any hassle. ;)

## Decorators

To utilize this service, you will need to import two decorators that will allow you to annotate your classes and methods accordingly.

    import { ScheduledClass, ScheduledMethod } from 'call-quota-enforcer';

To implement a quota for your class, you will need to annotate your class with the `ScheduledClass` decorator. Additionally, any methods that utilize the defined quota must be annotated using the `ScheduledMethod` decorator.

    @ScheduledClass({
        interval: {
            duration: 5,
            maxWeight: 300,
            size: 'SECOND',
            cache: 'MEMORY',
        }
    })
    export class TestService {


    @ScheduledMethod({ name: 'f1', weight: 1 })
    async function1(input: number) {
        // do somthing
            this.function2()
      }

    @ScheduledMethod({ name: 'f2', weight: 250 })
    async function2() {
        // do somthing

      }

    }

# Options

## ScheduledClass

    {
        // you can adjust maximum usage a weight in your classes that can be consumed

        interval: {
            duration: 5,        // 5 second
            size: 'SECOND',     // default: SECOND
            maxWeight: 300,     // The maximum weight that can be consumed within a 5-second interval will be reset after each 5-second period.
            cache: 'MEMORY',    // cache can be MEMORY
        }
    }

## ScheduledMethod

    {
        name: 'f2',      // for logging purpose
        weight: 250      // Whenever this function is invoked, the specified amount will be subtracted from the maximum weight.

    }

# Benefits

By leveraging the power of two decorators, you can exercise precise control over the manner in which you call your external services. These decorators provide you with the flexibility to customize and fine-tune your approach, ensuring that your interactions with external services align with your specific requirements and objectives.

# Use Case:

In certain cases, exceeding a certain threshold when making calls to external services can result in your service being banned. In such situations, it becomes essential to have control over the frequency of your calls to these external services. These decorators offer a solution to effectively manage and regulate the number of times you can call external services, helping you avoid any potential issues or restrictions.

# Todo:

- [ ] **Adding Redis support for multi-service instances:** Enhance the functionality of your multi-service instances by incorporating Redis support. This addition will enable efficient management and communication between different service instances.

- [ ] **Obtaining a sharable name from the class decorator**: Utilize a class decorator to obtain a sharable name that can be used across different classes. This approach promotes consistency and ease of use, allowing for seamless integration and collaboration between classes.
- [ ] **Adding a logger for debugging purposes:** For effective debugging and troubleshooting, consider adding a logger to your codebase. This logging mechanism will assist in identifying and resolving issues, providing valuable insights for error analysis and optimization.

# Known Issues:

**Keywords:** rate-limter, call governance, quota enforcement
