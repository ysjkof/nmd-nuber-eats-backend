import { Field, ObjectType } from '@nestjs/graphql';

// 엔티티 = DB에 있는 모듈
@ObjectType()
export class Restaurant {
  @Field((type) => String)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  isVegan?: boolean;

  @Field((type) => Boolean, { nullable: true })
  address?: boolean;

  @Field((type) => Boolean, { nullable: true })
  owenerName?: string;
}
