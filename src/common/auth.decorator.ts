import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuards } from 'src/auth/guards';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuards, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth(),
  );
}
