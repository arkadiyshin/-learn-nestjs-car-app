import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}


  async signup(email: string, password: string) {
    const users = await this.userService.find(email)
    if(users.length > 0) {
      throw new BadRequestException('email in use')
    }

    const hash = (password);
  }

  signin(email: string, password: string) {

  }
}
