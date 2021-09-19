import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

// GraphQL에 enum 연결
registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  // DB에 enum 연결
  @Column({ type: 'enum', enum: UserRole })
  // GraphQL에 enum 연결
  @Field((type) => UserRole)
  role: UserRole;

  // DB에 저장하기 전에 실행할 기능.
  // user.service.ts에서 .save하기 전에 create를 한다. create는 오브젝트를 만든다. 그래서 이미 password를 가지고 있다.
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
