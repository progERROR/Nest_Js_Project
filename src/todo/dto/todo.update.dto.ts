import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class TodoUpdateDto {
  @ApiProperty({ example: 'To buy milk', description: 'The name of todo' })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiProperty({
    example:
      'I remind you to buy milk when you will be in the store young man!',
    description: 'The description of todo',
  })
  @IsOptional()
  @IsString()
  public description: string;

  @ApiProperty({
    example: '2022-06-27T09:46:18.024Z',
    description:
      'date string (when todo should be done) = new Date().toISOString()',
  })
  @IsOptional()
  @IsDateString()
  public endDate: string = new Date().toISOString();
}
