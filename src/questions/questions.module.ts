import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
        fileFilter(req, file, callback) {
          const allowedMimes = ['audio'];
          // validar si es un audio a través de su extensión
          const mimeType = file.mimetype.split('/')[0];
          const isAllowed = allowedMimes.includes(mimeType);
          console.log('Is Allowed ', isAllowed);

          return isAllowed
            ? callback(null, true)
            : callback(new Error('El tipo de archivo no es válido'), false);
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}
