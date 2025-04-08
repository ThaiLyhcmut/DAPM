import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { LocalAuthGuard } from "src/core/guards/local-auth.guard";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";


@ApiTags('Area')
@Controller('area')
@ApiBearerAuth()

export class AreaController {
  constructor(
    private readonly areaService: AreaService,
    // private readonly areaService: AreaService,
  ) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getArea(@Request() request: any) {
    return request.user;
    // const area = await this.areaService.findByHomeId("homeId");
    // return area;
  }
}