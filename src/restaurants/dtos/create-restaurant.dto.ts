import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

// `@Args`를 여러개 입력해야할 경우 이렇게 모아서 넣을 수 있다.
// `@InputType`은 하나의 Obj다. arg로써 graphql에 전달한다.
// @InputType()
// export class CreateRestaurantDto {
//   @Field((type) => String)
//   name: string;
//   @Field((type) => Boolean)
//   isVegan: boolean;
//   @Field((type) => String)
//   adress: string;
//   @Field((type) => String)
//   ownersName: string;
// }

// @ArgsType은 분리된 값들을 GraphQL arg로 전달한다.
@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String, { nullable: true })
  @IsString()
  adress: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  ownersName: string;
}
