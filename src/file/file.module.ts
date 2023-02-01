import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaService } from '../prisma.service';
import { FileMiddleware } from './middleware/file.middleware';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FileMiddleware).forRoutes({
      path: 'files/*',
      method: RequestMethod.ALL,
    });
  }
}
