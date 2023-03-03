import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../interfaces/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    console.log(requiredRoles);
    console.log(context.switchToHttp().getRequest().user);
    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
