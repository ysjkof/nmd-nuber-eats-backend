import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateRestaurantInput } from './create-restaurant.dto';

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
  // 수정할 레스토랑이 뭔지 모른다. id를 CreateRestaurantInput에 추가할 수도 있고 여기에 변수로 추가할 수도 있다. 변수로 추가함.
  @Field(type => Number)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
