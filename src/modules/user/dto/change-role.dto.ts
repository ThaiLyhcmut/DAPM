import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../core/enums/role.enum';

export class ChangeRoleDto {
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(Role, { message: 'Invalid role' })
  @ApiProperty({ enum: Role, example: Role.ADMIN })
  role: Role;
}
