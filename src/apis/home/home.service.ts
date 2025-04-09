import { Injectable } from "@nestjs/common";
import { HomeRepository } from "./repository/home.repository";
import { Auth } from "../auth/entities/auth.entity";
import { AuthRepository } from "../auth/repository/auth.repository";
import { AuthService } from "../auth/auth.service";
import CreateHomeDto from "./dto/create-home.dto";




@Injectable()
export class HomeService {
  constructor(
    private readonly homeRepository: HomeRepository,
    private readonly authService: AuthService
    // private mailService: MailService,
  ) {
    // Constructor logic if needed
  }

  async createHome(home: any) {
    // Logic to handle the request
    const newHome = await this.homeRepository.create(home);
    return newHome;
  }

  async getHome(accountId: any) {
    // Logic to handle the request
    const home = await this.homeRepository.findByAccountId(accountId);
    return home;

  }

  async getHomeById(id: string) {
    const home = await this.homeRepository.findById(id);
    return home;
  }


  updateHome(id: string, updateHomeDto: any) {
    // Logic to handle the request
    const updatedHome = this.homeRepository.update(id, updateHomeDto);
    if (!updatedHome) {
      throw new Error('Home not found');
    }
    return {
      message: 'Home updated successfully',
    }
  }
  // Define your business logic methods here
  deleteHome(id: string) {
    // Logic to handle the request
    const deletedHome = this.homeRepository.delete(id);
    if (!deletedHome) {
      throw new Error('Home not found');
    }
    return {
      message: 'Home deleted successfully',
    }
  }
}