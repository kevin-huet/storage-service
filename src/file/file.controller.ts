import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { MessagePattern } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { File as FileModel } from '@prisma/client';

export class FileParam {
  appName: string;
  filename: string;
}

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @MessagePattern('ADD_FILE')
  public async addFile(args: {
    file: string;
    filename: string;
    appName: string;
  }): Promise<any> {
    console.log(args);
    const result = await this.fileService.addFile(
      args.file,
      args.filename,
      args.appName,
    );
    return { message: 'test' };
  }

  @MessagePattern('GET_FILE_URL')
  public async getFileUrl(args: { id: number }) {
    await this.fileService.getFileUrl();
    return {};
  }

  @Get(':appName/:file')
  public async getFile(
    @Param('appName') appName,
    @Param('file') filename,
    @Res() res: Response,
  ) {
    const file: FileModel = await this.fileService.getFile(appName, filename);
    if (!file) {
      return res.status(HttpStatus.NOT_FOUND);
    }
    res.sendFile('./' + file.path, { root: './' });
  }
}
