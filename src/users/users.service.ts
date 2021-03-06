import {
    Injectable,
    ConflictException,
    UnauthorizedException,
    NotFoundException,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { PrismaService } from 'src/prisma.service';
  import { User } from '@prisma/client';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class UserService {
    constructor(private database: PrismaService) {}
  
    async createUser(dadosDoUsuario: CreateUserDto): Promise<User> {
      if (dadosDoUsuario.password !== dadosDoUsuario.passwordConfirmation) {
        throw new UnauthorizedException(
          'A senha e confirmação da senha são incompativeis',
        );
      }
  
      const userExists = await this.database.user.findUnique({
        where: { email: dadosDoUsuario.email },
      });
  
      if (userExists) {
        throw new ConflictException('e-mail já está cadastrado');
      }
  
      const saltos = 10;
      const hashDaSenha = await bcrypt.hash(dadosDoUsuario.password, saltos);
  
      delete dadosDoUsuario.passwordConfirmation;
  
      const user = await this.database.user.create({
        data: {
          ...dadosDoUsuario,
          password: hashDaSenha,
        },
      });
  
      delete user.password;
      return user;
    }
  
    async update(id: string, dadosDoUsuario: UpdateUserDto): Promise<User> {
      const user = await this.database.user.update({
        data: dadosDoUsuario,
        where: { id: id },
      });
  
      delete user.password;
  
      return user;
    }
  
    async findMany(): Promise<any[]> {
      const user = await this.database.user.findMany();
      const userNoPass = user.map(({ password, ...resto }) => resto);
      return userNoPass;
    }
  
    async findUnique(id: string): Promise<User> {
      const user = await this.database.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        throw new NotFoundException(
          'Usuário não foi encontrado',
        );
      }
  
      delete user.password;
      return user;
    }
  
    async delete(id: string): Promise<{ message: string }> {
      const user = await this.database.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        throw new NotFoundException(
          'Usuário não foi encontrado',
        );
      } else {
        await this.database.user.delete({
          where: { id },
        });
      }
  
      return {
        message: 'Id  deletado com sucesso',
      };
    }
  }