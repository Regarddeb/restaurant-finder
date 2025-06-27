import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  execute(@Query() param: RestaurantDto) {
    return this.restaurantService.execute(param);
  }
}
