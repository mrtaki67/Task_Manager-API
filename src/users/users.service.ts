import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (
    private readonly prismaService: PrismaService,

  ) {}

  async create(createUserDto: CreateUserDto) {
    
    createUserDto.password = bcryptHashSync(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        usuario: createUserDto.usuario,
        email: createUserDto.email,
        password: createUserDto.password
      }
    })

    return user
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        tasks: true
      }
    })

    return user
  }

  async findByUsername(usuario: string) {
    return this.prismaService.user.findFirst({
      where: { usuario }
    })
     
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
