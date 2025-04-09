import { DynamicModule, ForwardReference, Type } from "@nestjs/common";
import { RoutesAccountModule } from "./router/account.module";
import { RouterModule as NestJsRouterModule } from "@nestjs/core";
import { RoutesAreaModule } from "./router/area.module";
import { RoutesEquipmentModule } from "./router/equipment.module";
import { RoutesHomeModule } from "./router/home.module";
import { RoutesMailModule } from "./router/mail.module";

export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type<any>
      | Promise<DynamicModule>
      | ForwardReference<any>
    )[] = [];
    imports.push(
      RoutesAccountModule,
      RoutesAreaModule,
      RoutesEquipmentModule,
      RoutesHomeModule,
      RoutesMailModule,
      NestJsRouterModule.register([
        {
          path: `/account`,
          module: RoutesAccountModule,
        },
        {
          path: `/area`,
          module: RoutesAreaModule,
        },
        {
          path: `/equipment`,
          module: RoutesEquipmentModule,
        },
        {
          path: `/home`,
          module: RoutesHomeModule,
        },
        {
          path: `/mail`,
          module: RoutesMailModule,
        }
        
      ]),
    ) // Add your modules here
    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
      
}