import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
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
          const allowedMimes = ['image'];
          // validar si es una imagen a través de su extensión
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
  controllers: [OptionsController],
  providers: [OptionsService, PrismaService],
})
export class OptionsModule {}
