import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 转换http Request
    // 取出元数据
    // 根据request.user.permissions
    // 判断是否包含 元素据 权限
    const request: Request = context.switchToHttp().getRequest();
    const permissions = request.user?.permissions;
    const requirePermissions = this.reflector.getAllAndOverride(
      'require_permissions',
      [context.getClass(), context.getHandler()],
    );
    if (!requirePermissions) {
      return true;
    }
    // 迭代查询  用户 是否符合其中一条权限
    for (let i = 0; i < requirePermissions.length; i++) {
      const permission = requirePermissions[i];
      const found = permissions.find((item) => item === permission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }
    return true;
  }
}
