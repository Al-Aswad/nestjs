import { SetMetadata } from '@nestjs/common';
import { Role } from './interfaces/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
