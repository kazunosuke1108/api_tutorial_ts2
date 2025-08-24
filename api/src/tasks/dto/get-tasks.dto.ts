import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBooleanString, IsOptional } from "class-validator";

export class GetTasksDto {
  @ApiPropertyOptional({ description: 'true or false' })
  @IsOptional()
  @IsBooleanString()
  done?: string; // 'true' or 'false'
}
