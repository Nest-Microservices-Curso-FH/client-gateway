import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

// decorador de parametro
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.token) {
      throw new InternalServerErrorException(
        'Token not found in the request (AunthGuard) called?',
      );
    }

    return request.token;
  },
);
