import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersResolver, UserService],
  // 다른 데서 쓰기 위해선 exports를 해야 한다. jwt.middleware.ts에서 inject하기 위해 exports함.
  exports: [UserService],
})
export class UsersModule {}
