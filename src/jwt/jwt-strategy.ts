import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {  
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const userToken = req.cookies['user_token'];
    
        if (!userToken) {
            throw new UnauthorizedException('Token não encontrado');
        }
    
        return userToken;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any, req: Request) {
    const user = await this.usersService.findOne(payload.sub)

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }

}