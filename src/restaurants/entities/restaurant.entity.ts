import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  // // GraphQL 스키마에서 이 필드의 기본값이 true라는 뜻.
  // @Field((type) => Boolean, { nullable: true })
  // // DB에서 이 필드의 기본값이 true라는 뜻.
  // @Column({ default: true })
  // // @IsOptional == 해당 필드는 필수가 아님.
  // @IsOptional()
  // @IsBoolean()
  // isVegan: boolean;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(type => String)
  @Column()
  @IsString()
  address: string;

  // 카테고리를 지울 때 레스토랑을 지우면 안되기 때문에 눌러블:트루한다.
  @Field(type => Category, { nullable: true })
  @ManyToOne(type => Category, category => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field(type => User)
  @ManyToOne(type => User, user => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field(type => [Order])
  @OneToMany(type => Order, order => order.restaurant)
  orders: Order[];

  @Field(type => [Dish])
  @OneToMany(type => Dish, dish => dish.restaurant)
  menu: Dish[];

  @Field(type => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field(type => Date, { nullable: true })
  @Column()
  promotedUntil: Date;
}
