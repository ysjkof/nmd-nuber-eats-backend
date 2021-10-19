import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInputType', { isAbstract: true })
 @ObjectType()
 class DishChoice {
   @Field(type => String)
   name: string;
   @Field(type => Int, { nullable: true })
   extra?: number;
 }

@InputType('DishOptionInputType', { isAbstract: true })
 @ObjectType()
 class DishOption {
   @Field(type => String)
   name: string;
  @Field(type => [DishChoice], { nullable: true })
   choices?: DishChoice[];
   @Field(type => Int, { nullable: true })
   extra?: number;
 }
 
@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field(type => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5, 140)
  description: string;

  // dish는 1개의 restaurant를 갖는다.
  @Field((type) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    // 레스토랑이 지워지면 디쉬도 지워짐.
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field(type => [DishOption], { nullable: true })
   @Column({ type: 'json', nullable: true })
   options?: DishOption[];
}
