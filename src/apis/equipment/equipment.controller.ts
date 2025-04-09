import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { EquipmentService } from "./equipment.service";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { createEquipmentDto } from "./dto/create-equipment.dto";



@Controller('equipment')
@ApiTags('Equipment')
@ApiBearerAuth()
export class EquipmentController {
  constructor(
    private readonly equipmentService: EquipmentService,
  ){}

  // Define your controller methods here
  @Post(':areaId')
  @UseGuards(JwtAuthGuard)
  async createEquipment(@Request() request: any, @Body() createEquipmentDto: createEquipmentDto, @Param('areaId') areaId: string) {
    const checkArea = await this.equipmentService.checkAreaOfAccount(areaId, request.user.id);
    if (!checkArea) {
      return {
        throw: new NotFoundException('You are not authorized to create this equipment'),
      }
    }
    const equipment = await this.equipmentService.createEquipment({
      ...createEquipmentDto,
      accountId: request.user.id,
      areaId
    });
    return equipment;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateEquipment(@Request() request: any, @Body() createEquipmentDto: createEquipmentDto,@Param('id') id: string) {
    const checkEquipment = await this.equipmentService.checkEquipmentOfAccount(id, request.user.id);
    if (!checkEquipment) {
      return {
        throw: new NotFoundException('You are not authorized to update this equipment'),
      }
    }
    const equipment = await this.equipmentService.updateEquipment(id, {
      ...createEquipmentDto,
      accountId: request.user.id,
    });
    return equipment;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteEquipment(@Request() request: any, @Param('id') id: string) {
    const checkEquipment = await this.equipmentService.checkEquipmentOfAccount(id, request.user.id);
    if (!checkEquipment) {
      return {
        throw: new NotFoundException('You are not authorized to delete this equipment'),
      }
    }
    const equipment = await this.equipmentService.deleteEquipment(id);
    return equipment
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getEquipment(@Request() request: any, @Param('id') id: string) {
    const checkEquipment = await this.equipmentService.checkEquipmentOfAccount(id, request.user.id);
    if (!checkEquipment) {
      return {
        throw: new NotFoundException('You are not authorized to view this equipment'),
      }
    }
    const equipment = await this.equipmentService.getEquipment(id);
    if (!equipment) {
      return {
        throw: new NotFoundException('No equipment found'),
      }
    }
    return equipment;
  }

  @Get('area/:areaId')
  @UseGuards(JwtAuthGuard)
  async getEquipmentByAreaId(@Request() request: any, @Param('areaId') areaId: string) {
    const checkArea = await this.equipmentService.checkAreaOfAccount(areaId, request.user.id);
    if (!checkArea) {
      return {
        throw: new NotFoundException('You are not authorized to view this equipment'),
      }
    }
    console.log(2)
    const equipment = await this.equipmentService.findByAreaId(areaId);
    if (!equipment) {
      return {
        throw: new NotFoundException('No equipment found'),
      }
    }
    return equipment;
  }
}