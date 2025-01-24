import { ApiConsumes, ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsLowercase, IsNumber, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";

export class GetUpcomingDto {
  @ApiProperty({
    description: "Amount of items to return",
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(20)
  amount: number;
}

export class SearchByTitleDto {
  @ApiProperty({
    description: "Amount of items to return",
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: "Request of the search",
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  request: string;
}

export class SearchByDateDto {
  @ApiProperty({
    description: "Amount of items to return",
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    description: "Request of the search (ISO8601 date string)",
    format: "date-time",
  })
  @IsDateString()
  date: string;
}

@ApiConsumes("multipart/form-data")
export class AddEventDto {
  @ApiProperty({
    description: "Title of the event",
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  title: string;

  @ApiProperty({
    description: "Description of the event",
    minLength: 1,
    maxLength: 1000,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: "Date of the event (ISO8601 date string)",
    format: "date-time",
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: "Category of the event",
    minLength: 1,
    maxLength: 16,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  category: string;

  @ApiProperty({
    description: "Content rating of the event",
    minimum: 0,
    maximum: 18,
  })
  @IsNumber()
  @Min(0)
  @Max(18)
  rating: number;

  @ApiProperty({
    description: "Location of the event",
    minLength: 1,
    maxLength: 128,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  location: string;

  @ApiProperty({
    description: "Image file of the event",
    format: "binary",
  })
  file: string;
}
export class getEventByIdDto {
  @ApiProperty({
    description: "ID of the event",
    format: "uuid",
  })
  @IsUUID()
  id: string;
}
