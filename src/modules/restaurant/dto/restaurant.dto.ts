import { IsString } from 'class-validator';

export class RestaurantDto {
  @IsString()
  message: string;

  @IsString()
  code: string;
}
