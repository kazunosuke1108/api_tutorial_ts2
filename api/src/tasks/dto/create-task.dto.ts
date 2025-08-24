import { ApiProperty } from "@nestjs/swagger";
// Swagger UIにAPIの説明を掲載するためのimport
import { isBoolean, IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";
// 入力された値のチェックをしてくれる

export class CreateTaskDto {
  @ApiProperty({ example: 'Write sequence diagram' }) // Swaggerに例を示すためのコマンド
  @IsString()
  @MaxLength(200)
  title!: string; // 「!:」はnullやundefinedではダメですよ、の意味

  @ApiProperty({ example: 'Draw mermaid sequence for API flow', required: false })
  @IsOptional()
  @IsString()
  description?: string; // 「?:」は任意である、の意味

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
