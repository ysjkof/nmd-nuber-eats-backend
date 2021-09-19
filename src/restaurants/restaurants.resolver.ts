import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  // restaurants.module에 provider에 RestaurantService가 추가되야 여기서 사용가능. 그 뒤에 service에서 접근가능.
  constructor(private readonly restaurantService: RestaurantService) {}

  //   이하 ()=> Boolean은 필수다. GraphQL을 위함.
  @Query((returns) => [Restaurant])
  // 이하 :Boolean은 안필수다. TypeScript를 위함.
  // 'veganOnly는 GraphQL을 위한 부분, veganOnly: boolean은 우리 펑션을 위한 부분.
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createRestaurant(
    // @InputType을 쓴다면 @Args()에 인자가 있어야 한다. 꼭 input일 필요는 없다.
    @Args('input') CreateRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(CreateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
