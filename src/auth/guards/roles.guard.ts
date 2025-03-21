import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../models/roles.model';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{ user: PayloadToken }>();
    const operador = request.user;

    const isAuth = roles.some((role) => role === (operador.role as Role));
    if (!isAuth) {
      throw new UnauthorizedException('Tu rol no permite realizar la tarea');
    }
    return isAuth;
  }
}
