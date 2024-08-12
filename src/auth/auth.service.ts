import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { User } from './dto/user.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async register(user: RegisterDto): Promise<User> {
    const { name, email, password } = user;

    const hashedPassword = await this.hashPassword(password);

    const userCreated = this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return plainToInstance(User, userCreated, { excludeExtraneousValues: true });
  }

  async signIn(loginData: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail({
      email: loginData.email,
    });

    if (user && (await bcrypt.compare(loginData.password, user.password))) {
      const payload = { sub: user.id, emaiL: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
