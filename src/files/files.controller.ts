import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import {fileNamer } from './helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) { }

  @Get('project/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProjectImage(imageName);

    res.sendFile(path);
  }


  
  @Post('project')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadFileProjectImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    /* const secureUrl = `${file.filename}`; */
     const secureUrl = `${this.configService.get('HOST_API')}/files/project/${
       file.filename
       }`;
    
    `App running on port ${process.env.PORT}`;
    return {
      secureUrl,
    };
  }
}
