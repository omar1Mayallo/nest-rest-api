import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/shared/constants/user-roles';
import { ROLES_KEY } from 'src/shared/decorators/roles.decorator';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1) Get The Roles That Set To (class-level and method-level ) metadata in ROLES_KEY
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // console.log(requiredRoles);

    // 2) If No Roles set continue to the accessed route
    if (!requiredRoles) {
      return true;
    }
    // 3) We Attach The user to the Authenticated Request, So Check if the user.role in the requiredRoles array
    const { user } = context.switchToHttp().getRequest();

    const isAuthorized = requiredRoles.includes(user.role);

    if (!isAuthorized) {
      throw new UnauthorizedException('You do not have permission to perform this action');
    } else {
      return true;
    }
  }
}
