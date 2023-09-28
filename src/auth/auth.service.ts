import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { User } from 'src/user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { BcryptService } from 'src/shared/services/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';

export interface IUserWithToken {
  token: string;
  user: Omit<User, 'password'>; // Omit the 'password' field from User
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  // PRIVATE_METHODS
  private async generateToken(id: string): Promise<string> {
    return this.jwtService.signToken(
      { id },
      this.configService.get('JWT_SECRET'),
      this.configService.get('JWT_EXPIRATION_DATE')
    );
  }

  // USER_REGISTER
  async register(registerDto: RegisterDto): Promise<IUserWithToken> {
    // 1) Check If User Is InActive
    const inActiveUser = await this.userService.findOneByEmailWithDeleted(registerDto.email);
    if (inActiveUser && inActiveUser.deletedAt !== null)
      throw new BadRequestException('Your Account Is InActive, Login To Activate it');

    // 2) Create User
    const user = await this.userService.createUser(registerDto);

    // 3) Generate Token
    const token = await this.generateToken(`${user.id}`);

    return { token, user };
  }

  // USER_LOGIN
  async login(loginDto: LoginDto): Promise<IUserWithToken> {
    // 1) Check If User InActive
    const inActiveUser = await this.userService.findOneByEmailWithDeleted(loginDto.email);
    if (inActiveUser && inActiveUser.deletedAt !== null)
      throw new BadRequestException(
        'Your Account Is InActive, Do You Need To Activate Your Account?'
      );

    // 2) Check If User is Exist and Password Is Correct
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user || !(await this.bcryptService.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    // 3) Generate Token
    const token = await this.generateToken(`${user.id}`);

    return { token, user };
  }
}
