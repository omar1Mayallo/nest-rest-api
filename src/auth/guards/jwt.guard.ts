import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/shared/services/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // 1) Extract The Token From "Bearer <_Token_>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Please login to get access');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Please login to get access');
    }

    try {
      // 2) Verify and Decoded token
      const decodedToken = await this.jwtService.verifyToken(token);

      // 3) Get Logged User
      const loggedUser = await this.userService.findOneById(decodedToken.id);
      // console.log(loggedUser);

      // 4) Attach the loggedUser to the request
      req.user = loggedUser;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Please login to get access');
    }
  }
}
