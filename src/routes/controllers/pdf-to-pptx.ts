import { Request, Response } from 'express';
import { pdfToPptxService } from '../../services/conversion-services';

export async function convertPdfToPptx(req: Request, res: Response) {
	try {
		if (!req.body || !req.body.length) {
			return res.status(400).json({ error: 'No PDF data received' });
		}

		const pptxBuffer = await pdfToPptxService(req.body);

		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
		res.send(pptxBuffer);
	} catch (err: any) {
		console.error('Conversion error:', err);
		res.status(500).json({ error: err.message });
	}
}
