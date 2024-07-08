import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
export class UnloginException {
  message: string;
  constructor(message?) {
    this.message = message;
  }
}
// 指定要捕获的异常类 为 未登录异常
@Catch(UnloginException)
export class UnloginFilter implements ExceptionFilter {
  // exception:捕获的异常对象
  // host:上下文
  catch(exception: UnloginException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response
      .json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'fail',
        data: exception.message || '用户未登录',
      })
      .end();
  }
}
