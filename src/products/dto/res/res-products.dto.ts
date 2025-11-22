import { Expose, Type } from 'class-transformer';

export class ProductBodyDto {
  @Expose()
  @Type(() => Number)
  id: number;
  @Expose()
  @Type(() => String)
  title: string;
  @Expose()
  @Type(() => String)
  photo: string;
  @Expose()
  @Type(() => Number)
  quantity: number;
  @Expose()
  @Type(() => Number)
  averageRating: number;
  @Expose()
  @Type(() => Date)
  created_at: Date;
  @Expose()
  @Type(() => Date)
  updated_at: Date;
  @Expose()
  reviews;
}
