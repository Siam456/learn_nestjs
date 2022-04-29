import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class testMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.params.name);

    console.log('passing middleware');
    if (req.params.name === 'siam') next();
    else {
      res.status(500).json({
        err: "param name mush be 'siam'",
      });
    }
  }
}
