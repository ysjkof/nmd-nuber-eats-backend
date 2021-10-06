import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  // treu를 리턴하면 request를 진행하고 false면 request를 멈춘다.
  canActivate(context: ExecutionContext) {
    // GraphQL에 메타데이터가 있으면 AuthGuard가 실행돼 유저를 확인한다.
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    // context가 http context기 때문에 grqphql context로 바꿔준다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) {
      return false;
    }
    return roles.includes(user.role);
  }
}
