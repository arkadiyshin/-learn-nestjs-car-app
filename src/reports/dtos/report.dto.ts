import { BlobOptions } from "buffer";
import { Expose, Transform } from "class-transformer";

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  milage: number;

  @Expose()
  approved: boolean;
  
  @Transform( ({ obj }) => obj.user.id )
  @Expose()
  userId: number;
}