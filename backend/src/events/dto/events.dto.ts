import { IsDateString, IsNumber, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";

export class GetUpcomingDto {
  @IsNumber()
  @Min(1)
  @Max(20)
  amount: number;
}

export class SearchByTitleDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @MaxLength(32)
  request: string;
}

export class SearchByDateDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsDateString()
  date: string;
}

export class AddEventDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  @MinLength(1)
  @MaxLength(10)
  category: string;

  @IsNumber()
  @Min(0)
  @Max(18)
  rating: number;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  location: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  image: string;
}

export class UploadEventImageDto {
  @IsUUID(4)
  id: string;
}
