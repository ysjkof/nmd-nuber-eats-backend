import { SetMetadata } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  // restaurants.module에 provider에 RestaurantService가 추가되야 여기서 사용가능. 그 뒤에 service에서 접근가능.
  constructor(private readonly restaurantService: RestaurantService) {}

  //   이하 ()=> Boolean은 필수다. GraphQL을 위함.
  @Mutation((returns) => CreateRestaurantOutput)
  @Role(['Owner'])
  async createRestaurant(
    // 현재 로그인한 유저를 불러오는 기능.
    @AuthUser() authUser: User,
    // @InputType을 쓴다면 @Args()에 인자가 있어야 한다. 꼭 input일 필요는 없다.
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }
}
