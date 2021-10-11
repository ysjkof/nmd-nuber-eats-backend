import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    {
      // guard를 앱 모든 곳에서 사용하고 싶다면 APP_GUARD를 사용한다. 모든 리솔버에서 가드가 실행됨.
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
