/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/entity/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // return false;
    // console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles);

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => {
      return user.role?.includes(role);
    });
  }
}
