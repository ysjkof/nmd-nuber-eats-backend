import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  //   이하 ()=> Boolean은 필수다. GraphQL을 위함.
  @Query((returns) => [Restaurant])

  // 이하 :Boolean은 안필수다. TypeScript를 위함.
  // 'veganOnly는 GraphQL을 위한 부분, veganOnly: boolean은 우리 펑션을 위한 부분.
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() CreateRestaurantDto: CreateRestaurantDto): boolean {
    console.log(CreateRestaurantDto);
    return true;
  }
}
