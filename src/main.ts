import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { jwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // middleware를 전체경로에서 사용하고 싶다면 이렇게.
  // 이때는 functional middleware만 가능. class 안됨.
  // app.use(jwtMiddleware);
  await app.listen(3333);
}
bootstrap();
