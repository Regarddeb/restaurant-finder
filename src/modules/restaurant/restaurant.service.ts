import { Injectable, UnauthorizedException } from '@nestjs/common';

import { RestaurantDto } from './dto/restaurant.dto';
import { PromptGeneratorService } from '../prompt-generator/prompt-generator.service';
import { PlaceFinderService } from '../place-finder/place-finder.service';
import configuration from 'src/config/env.validation';

const config = configuration();
@Injectable()
export class RestaurantService {
  constructor(
    private readonly promptGeneratorService: PromptGeneratorService,
    private readonly placeFinderService: PlaceFinderService,
  ) {}

  async execute(dto: RestaurantDto) {
    if (dto.code !== config.auth.authCode) {
      throw new UnauthorizedException('Message is invalid or not recognized');
    }

    let queryParams = await this.promptGeneratorService.execute(dto.message);
    // return this string if no query parameters found
    if (Object.keys(queryParams.parameters).length === 0) {
      return 'Invalid prompt. Please try searching for a place/restaurant.'
    }
    let places = await this.placeFinderService.execute(queryParams);
    return places;
  }
}
