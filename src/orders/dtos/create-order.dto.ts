import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DishOption } from 'src/restaurants/entities/dish.entity';
import { OrderItemOption } from '../entities/order-item.entity';

@InputType()
class CreateOrderItemInput {
  @Field(type => Int)
  dishId: number;

  @Field(type => OrderItemOption, { nullable: true })
  options?: OrderItemOption[];
}

@InputType()
// OrderItem 전체를 input하지 않기 위해서. extends하지 않음.
// export class CreateOrderInput extends PickType(Order, ['items']) {
export class CreateOrderInput {
  @Field(type => Int)
  restaurantId: number;

  @Field(type => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
