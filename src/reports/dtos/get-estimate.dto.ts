import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsLongitude,
  IsLatitude,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
