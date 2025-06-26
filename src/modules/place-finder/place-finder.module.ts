import { Module } from '@nestjs/common';
import { PlaceFinderService } from './place-finder.service';

@Module({
  providers: [PlaceFinderService]
})
export class PlaceFinderModule {}
