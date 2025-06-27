import {
  IsString,
  IsNumber,
  IsBoolean,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindPlaceParametersDto {
  @IsString()
  query: string;

  @IsString()
  near: string;

  @IsNumber()
  @Min(0)
  min_price: number;

  @IsNumber()
  @Max(5)
  max_price: number;

  @IsBoolean()
  open_now: boolean;

  @IsString()
  fields: string;
}

export class FindPlaceDto {
  @IsString()
  action: string;
  
  @ValidateNested()
  @Type(() => FindPlaceParametersDto)
  parameters: FindPlaceParametersDto;
}
