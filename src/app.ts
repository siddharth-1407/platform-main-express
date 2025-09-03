import express from 'express';
import cors from 'cors';
import conversionRouter from './routes/conversion.routes';

const app = express();

app.use(cors({ origin: '*' }));

app.use(
	express.raw({
		type: 'application/pdf',
		limit: '10mb',
	})
);

app.use('/convert', conversionRouter);

export default app;
