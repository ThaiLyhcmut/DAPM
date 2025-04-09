import { Module } from "@nestjs/common";
import { AreaModule } from "src/apis/area/area.module";




@Module({
  imports: [AreaModule],
  controllers: [],
  providers: [],
  exports: [],
  // Add your modules here
  // imports: [RouterModule.forRoot()],
  // imports: [
  //   RoutesAdminModule,
  //   RoutesFrontModule,
  //   RoutesFrontLocaleModule,
  //   RoutesAdminLocaleModule,
  //   RoutesAdminModuleAddon,
  //   CacheMangerModule,
  //   CommonModule,
  //   PermissionsModule, 
})

export class RoutesAreaModule {}