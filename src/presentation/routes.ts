import { Router } from 'express';
import { FileUploadRoutes } from './file-upload/routes';
import { ImageRoutes } from './images/routes';
import { DeleteRoutes } from './file-delete/routes';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use('/api/upload', FileUploadRoutes.routes );
    router.use('/api/load', ImageRoutes.routes );
    router.use('/api/delete', DeleteRoutes.routes );
    return router;
  }


}

