import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get<string>('redis_server_host'),
            port: configService.get<number>('redis_server_port'),
          },
          password: configService.get<string>('redis_server_password'),
          database: configService.get<number>('redis_server_db'),
        });
        await client.connect();
        client.on('error', (e) => console.log(e));
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
