import { Module } from "@nestjs/common";
import { HomeModule } from "src/apis/home/home.module";




@Module({
  imports: [HomeModule],
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

export class RoutesHomeModule {}