import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API register đã được di chuyển sang UserController

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request: any) {
    console.log(request.user)
    return this.authService.login(request.user)
  }
}
