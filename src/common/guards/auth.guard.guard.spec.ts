import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import configuration from 'src/config/env.validation';

const config = configuration();

@Injectable()
export class ApiCodeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (code !== config.auth.authCode) {
      throw new UnauthorizedException('Invalid access code');
    }

    return true;
  }
}
