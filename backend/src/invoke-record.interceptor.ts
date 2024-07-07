import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, pipe, tap } from 'rxjs';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 记录访问ip user agent controller handler 接口耗时响应内容 当前登录用户信息
    const request: Request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    const agent = request.headers['user-agent'];
    const { ip, method, path } = request;

    this.logger.debug(
      `${method} ${path} ${ip} ${agent}: ${context.getClass().name} ${context.getHandler().name} invoked...`,
    );

    this.logger.debug(
      `user: ${request.user?.userId}, ${request.user?.username}`,
    );
    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        this.logger.debug(
          `${method} ${path} ${ip} ${agent}: ${response.statusCode}: ${Date.now() - now}ms`,
        );
        this.logger.debug(`Response: ${JSON.stringify(res)}`);
      }),
    );
  }
}
