import { IsNumber, Max, Min } from "class-validator";

export class GetUpcomingDto {
  @IsNumber()
  @Min(1)
  @Max(20)
  amount: number;
}
