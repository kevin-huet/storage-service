import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { PrismaService } from '../prisma.service';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { File as FileModel } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async addFile(file: string, filename: string, appName: string) {
    const dirname = `files/${appName}/`;
    const fileExt = filename.split('.').pop();
    const buffer = Buffer.from(file, 'base64');
    const uniqueName = uuidv4();

    if (!existsSync(dirname)) mkdirSync(dirname);
    writeFileSync(`${dirname}${uniqueName}.${fileExt}`, buffer);

    await this.prisma.file.create({
      data: {
        name: `${uniqueName}.${fileExt}`,
        path: `${dirname}${uniqueName}.${fileExt}`,
        app: appName,
      },
    });
    return '';
  }

  async getFileUrl() {
    const file: File = null;
    //this.prisma.file
  }

  async getFile(appName: string, filename: string): Promise<FileModel | null> {
    return this.prisma.file.findFirst({
      where: {
        name: filename,
        app: appName,
      },
    });
  }
}
