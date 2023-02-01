import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class FileMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.url.startsWith('/files/')) {
      next();
    }
  }
}
