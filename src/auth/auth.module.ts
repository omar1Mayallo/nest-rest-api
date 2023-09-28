import { BcryptModule } from 'src/shared/services/bcrypt/bcrypt.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from 'src/shared/services/jwt/jwt.module';
import { RemoveResponsePasswordInterceptor } from 'src/shared/interceptors/removeResponsePassword.interceptor';

@Module({
  imports: [UserModule, JwtModule, BcryptModule],
  controllers: [AuthController],
  providers: [AuthService, RemoveResponsePasswordInterceptor]
})
export class AuthModule {}
