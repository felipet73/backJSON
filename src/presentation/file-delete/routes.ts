import { Router } from 'express';
import { DeleteController } from './controller';


export class DeleteRoutes {


  static get routes():Router {

    const router = Router();
    const controller = new DeleteController();

    router.get('/:type/:img', controller.deleteImage )

    return router;

  }


}

