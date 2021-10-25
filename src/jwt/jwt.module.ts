import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      // 반환할 모듈의 이름
      module: JwtModule,
      providers: [
        {
          // provide === provide의 이름
          provide: CONFIG_OPTIONS,
          // 그 value가 options
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
