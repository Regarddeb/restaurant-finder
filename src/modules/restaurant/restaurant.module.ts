import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PromptGeneratorService } from '../prompt-generator/prompt-generator.service';
import { PlaceFinderService } from '../place-finder/place-finder.service';

@Module({
  providers: [
    RestaurantService, 
    PromptGeneratorService, 
    PlaceFinderService
  ],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
