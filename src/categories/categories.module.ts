import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
        fileFilter(req, file, callback) {
          const allowedMimes = ['image'];
          // validar si es una imagen, un audio o un video a través de su extensión
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
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, JwtService],
})
export class CategoriesModule {}
