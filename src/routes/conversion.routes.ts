import { Router } from 'express';
import { convertPdfToPptx } from './controllers/pdf-to-pptx';

const conversionRouter = Router();

conversionRouter.post('/pdf-to-pptx', convertPdfToPptx);

export default conversionRouter;
