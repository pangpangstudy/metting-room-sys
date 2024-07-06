import { SetMetadata } from '@nestjs/common';
export const RequireLogin = () => SetMetadata('require_login', true);
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('require_permissions', permissions);
