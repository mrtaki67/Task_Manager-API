import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(usuario)

    if (!user) {
      throw new NotFoundException('Informações incorretas ou usuário não existe :/');
    }


    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...result } = user

        return result
    }

    throw new UnauthorizedException('E-mail ou senha inválidos');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id}
    const accessToken = this.jwtService.sign(payload);

    return accessToken
  }



}