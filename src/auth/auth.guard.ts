import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  // canActivate: treu를 리턴하면 request를 진행하고 false면 request를 멈춘다.
  async canActivate(context: ExecutionContext) {
    // GraphQL에 메타데이터가 있으면 AuthGuard가 실행돼 유저를 확인한다.
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    // 메타데이터가 없으면 public이므로 true 리턴하고 끝. 메타데이터가 있다면 private이므로 user가 있기를 바라는 거다.
    console.log('AuthGuard LOG :', roles);
    if (!roles) {
      return true;
    }
    // context가 http context기 때문에 grqphql context로 바꿔준다.
    // gqlContext는 app.module.ts에 GraphQLModule에 context를 뜻한다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;
    if (token) {
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        const { user } = await this.userService.findById(decoded['id']);
        if (!user) {
          return false;
        }
        gqlContext['user'] = user;
        if (roles.includes('Any')) {
          return true;
        }
        // roles가 user.role과 동일한지 확인한다.
        return roles.includes(user.role);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
