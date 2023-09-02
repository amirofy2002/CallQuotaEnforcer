import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ModuleOptions } from "../../core/types/module.options";

@Module({})
export class QuotaEnforcerModule {
  static forRoot(options: ModuleOptions): DynamicModule {
    const { cache } = options;
    const providers: Provider[] = [];
    return {
      providers,
      exports: providers,
      module: QuotaEnforcerModule,
    };
  }
}
