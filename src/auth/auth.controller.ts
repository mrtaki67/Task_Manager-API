import { Controller, Post, Body, UnauthorizedException, BadRequestException, Get, Query, Put, Param, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; 
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { usuario: string; password: string }, @Res() res: Response, @Req() req: Request) {
    const user = await this.authService.validateUser(body.usuario, body.password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const token = await this.authService.login(user);
    console.log('Token gerado:', token);

    res.cookie('user_token', token, {
      httpOnly: true,
      domain: 'localhost',
      sameSite: 'lax',
      secure: false,    
      path: '/',
      
    });
    

    return res.send({ message: 'Login realizado com sucesso' });
  }





}