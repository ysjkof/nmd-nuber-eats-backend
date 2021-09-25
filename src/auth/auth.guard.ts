import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  // treu를 리턴하면 request를 진행하고 false면 request를 멈춘다.
  canActivate(context: ExecutionContext) {
    // context가 http context기 때문에 grqphql context로 바꿔준다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
