import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { LocalAuthGuard } from "src/core/guards/local-auth.guard";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import CreateAreaDto from "./dto/create-area.dto";
import UpdateAreaDto from "./dto/update-area.dto";


@ApiTags('Area')
@Controller('area')
@ApiBearerAuth()

export class AreaController {
  constructor(
    private readonly areaService: AreaService,
    // private readonly areaService: AreaService,
  ) {}
  

  @Get(':homeId')
  @UseGuards(JwtAuthGuard)
  async getAreas(@Request() request: any, @Param('homeId') homeId: string) {
    const check = await this.areaService.checkHomeOfAccount(homeId, request.user.id);
    if (!check) {
      return {
        throw: new NotFoundException('You are not authorized to get this area'),
      }
    }
    const areas = await this.areaService.findByHomeId(homeId);
    if (!areas) {
      return {
        throw: new NotFoundException('No areas found'),
      }
    }
    return areas;
  }

  @Get(':homeId/:id')
  @UseGuards(JwtAuthGuard)
  async getArea(@Request() request: any, @Param('homeId') homeId: string, @Param('id') id: string) {
    const checkHome = await this.areaService.checkHomeOfAccount(homeId, request.user.id);
    if (!checkHome) {
      return {
        throw: new NotFoundException('You are not authorized to get this area'),
      }
    }
    const checkArea = await this.areaService.checkAreaOfHome(id, homeId);
    if (!checkArea) {
      return {
        throw: new NotFoundException('You are not authorized to get this area'),
      }
    }
    const area = await this.areaService.getArea(id);
    if (!area) {
      return {
        throw: new NotFoundException('No area found'),
      }
    }
    return area;
  }

  @Post(':homeId')
  @UseGuards(JwtAuthGuard)
  async createArea(
    @Request() request: any,
    @Param('homeId') id: string, 
    @Body() createAreaDto: CreateAreaDto
  ) {
    console.log(id)
    const check = await this.areaService.checkHomeOfAccount(id, request.user.id);
    console.log(check, request.user.id)
    if (!check) {
      return {
        throw: new Error('You are not authorized to create this area'),
      }
    }
    console.log("1")
    const area = await this.areaService.createArea({
      ...createAreaDto,
      homeId: id,
    });
    console.log(area)
    return area;
    
  }

  @Patch(':homeId/:id')
  @UseGuards(JwtAuthGuard)
  async updateArea(@Request() request: any, @Param('homeId') homeId: string, @Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    const checkHome = await this.areaService.checkHomeOfAccount(homeId, request.user.id);
    if (!checkHome) {
      return {
        throw: new NotFoundException('You are not authorized to update this area'),
      }
    }

    const checkArea = await this.areaService.checkAreaOfHome(id, homeId);
    if (!checkArea) {
      return {
        throw: new NotFoundException('You are not authorized to update this area'),
      }
    }
    const area = await this.areaService.updateArea(id, updateAreaDto);
    return area;
  }

  @Delete(':homeId/:id')
  @UseGuards(JwtAuthGuard)
  async deleteArea(@Request() request: any, @Param('homeId') homeId: string, @Param('id') id: string) {
    const checkHome = await this.areaService.checkHomeOfAccount(homeId, request.user.id);
    if (!checkHome) {
      return {
        throw: new NotFoundException('You are not authorized to delete this area'),
      }
    }
    const checkArea = await this.areaService.checkAreaOfHome(id, homeId);
    if (!checkArea) {
      return {
        throw: new NotFoundException('You are not authorized to delete this area'),
      }
    }
    const area = await this.areaService.deleteArea(id);
    return area;
  }
}