import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Request } from 'express';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  async account(@Req() req: Request) {
    const user = req.user

    return user
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {

      res.clearCookie('user_token', 
      {   
        httpOnly: true,
        domain: 'localhost',
        sameSite: 'lax', 
        secure: false,  
        path: '/',
      });

      return res.send({ message: 'Logout do usuário realizado com sucesso.' });
  }

  
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
