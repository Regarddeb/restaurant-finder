import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PromptGeneratorModule } from './modules/prompt-generator/prompt-generator.module';
import { PlaceFinderModule } from './modules/place-finder/place-finder.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

import configuration from './config/env.validation';

const config = configuration();
const isProduction = config.app.environment === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PromptGeneratorModule,
    PlaceFinderModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
