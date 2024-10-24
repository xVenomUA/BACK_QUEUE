import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDateString,
  } from 'class-validator';
  
  export class UpdateQueueDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Date is required' })
    // @IsDateString(
    //   {},
    //   { message: 'Date must be in a valid ISO format (YYYY-MM-DD)' },
    // )
    date: string;
  
    @IsOptional()
    @IsString({ message: 'Extra data must be a string' })
    extraData?: string;
  }
  