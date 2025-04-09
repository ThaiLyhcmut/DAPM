import { Body, Controller, Get, Param, Patch, Post, Put, Request, UseGuards, NotFoundException, UnauthorizedException, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HomeService } from "./home.service";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import CreateHomeDto from "./dto/create-home.dto";
import UpdateHomeDto from "./dto/update-home.dto";

@ApiTags('Home')
@Controller('home')
@ApiBearerAuth()
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {
    // Constructor logic if needed
  }
  
  @Post()
  @UseGuards(JwtAuthGuard)
  createHome(@Request() request: any, @Body() createHomeDto: CreateHomeDto) {
    // Logic to handle the request
    return this.homeService.createHome({
      ...createHomeDto,
      accountId: request.user.id
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getHome(@Request() request: any) {
    // Logic to handle the request
    return this.homeService.getHome(request.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getHomeById(
    @Request() request: any,
    @Param('id') id: string
  ) {
    const home = await this.homeService.getHomeById(id);
    
    if (!home) {
      throw new NotFoundException('Home not found');
    }
    
    if (home.accountId !== request.user.id) {
      throw new UnauthorizedException('You are not authorized to view this home');
    }
    
    return home;
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateHome(
    @Request() request: any,
    @Body() updateHomeDto: UpdateHomeDto,
    @Param('id') id: string
  ) {
    const home = await this.homeService.getHomeById(id);
    
    if (!home) {
      throw new NotFoundException('Home not found');
    }
    
    if (home.accountId !== request.user.id) {
      throw new UnauthorizedException('You are not authorized to update this home');
    }
    
    return this.homeService.updateHome(id, updateHomeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteHome(
    @Request() request: any,
    @Param('id') id: string
  ) {
    const home = await this.homeService.getHomeById(id);
    
    if (!home) {
      throw new NotFoundException('Home not found');
    }
    
    if (home.accountId !== request.user.id) {
      throw new UnauthorizedException('You are not authorized to delete this home');
    }
    
    return this.homeService.deleteHome(id);
  }
}