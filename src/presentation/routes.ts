import { Router } from 'express';
import { FileUploadRoutes } from './file-upload/routes';
import { ImageRoutes } from './images/routes';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    // Definir las rutas
    router.use('/api/upload', FileUploadRoutes.routes );
    router.use('/api/load', ImageRoutes.routes );
    return router;
  }


}

