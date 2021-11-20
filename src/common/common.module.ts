import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './common.constants';

// pubsub은 한 개만 호출해야 한다. 앱의 모든 곳에서 사용하려면 모듈을 만들어 똑같은 펍섭을 불러오게 한다.
const pubsub = new PubSub();

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
export class CommonModule {}
