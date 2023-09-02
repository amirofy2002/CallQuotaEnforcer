# CallQuotaEnforcer

Enforce quota for calling external services

# What is was the problem, what is supposed to be resolved?

Sometimes, you may want to control how to call external services. Regarding to control this situation, you will need to control how may times you can call exteral services ( servers ). This package tries to resolve this issue for you without trouble. ;)

## Decorators

For using this service you have to import two decorators to annonate you classes and methods respectively.

    import { ScheduledClass, ScheduledMethod } from 'call-quota-enforcer';

for applying quota for you class you have to annotate your class with `ScheduledClass` decorator. Moreover, you need to annotate your methods which use defined quota must be annotated using `ScheduledMethod`

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

# Todo:

- [ ] adding redis support for multi service instances
- [ ] get a name from class decorator which might be sharable between different classes

# Known Issues:
