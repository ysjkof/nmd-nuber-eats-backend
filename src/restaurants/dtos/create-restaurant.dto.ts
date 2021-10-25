import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
// Restaurant는 @ObjectType다. InputType은 @InputType만 가능. 그래서 OmitType 3번째 인자에 InputType으로 데코레이터를 바꿔달라고 요청?
// 3번째 인자를 쓰지 않고 entity에서 @ObjectType밑에 @InputType({isAbstract:true})를 넣을 수도 있다. isAbstract는 ObjectType과 InputType의 타입이름이 똑같이 떄문에 InputType이 스키마에 포함되지 않게 한다는뜻. 어떤것으로 확장시킨다는 뜻.
export class CreateRestaurantInput extends PickType(
  Restaurant,
  ['name', 'coverImg', 'address'],
  InputType,
) {
  @Field(type => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}

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
// @ArgsType()
// export class CreateRestaurantDto {
//   @Field((type) => String)
//   @IsString()
//   @Length(5, 10)
//   name: string;

//   @Field((type) => Boolean, { nullable: true })
//   @IsBoolean()
//   isVegan: boolean;

//   @Field((type) => String, { nullable: true })
//   @IsString()
//   adress: string;

//   @Field((type) => String, { nullable: true })
//   @IsString()
//   ownersName: string;
// }
