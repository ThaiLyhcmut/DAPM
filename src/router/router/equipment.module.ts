import { Module } from "@nestjs/common";
import { EquipmentModule } from "src/apis/equipment/equipment.module";




@Module({
  imports: [EquipmentModule],
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

export class RoutesEquipmentModule {}