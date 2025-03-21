import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import config from 'src/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  @Inject(config.KEY) private configService: ConfigType<typeof config>;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublic = this.reflector.get('isPublic', context.getHandler());
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, () =>
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    // const isAuthorized = authHeader == '1234';
    const isAuthorized = authHeader == this.configService.apiKey;
    if (!isAuthorized) {
      throw new UnauthorizedException('No esta autorizado');
    }
    return isAuthorized;
  }
}
