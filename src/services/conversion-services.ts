import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import pkg from '@pdftron/pdfnet-node';
import { cleanupFiles, getStructuredOutputPath } from '../lib/utils';

const { PDFNet } = pkg;

export async function pdfToPptxService(pdfBuffer: Buffer): Promise<Buffer> {
	const inputPath = path.join(process.cwd(), 'temp', `${uuidv4()}.pdf`);
	const outputPath = inputPath.replace('.pdf', '.pptx');

	fs.writeFileSync(inputPath, pdfBuffer);

	await PDFNet.initialize(process.env.PDFTRON_LICENSE_KEY);

	await PDFNet.runWithCleanup(async () => {
		const pdfdoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
		await pdfdoc.initSecurityHandler();
		await pdfdoc.lock();

		const structuredOutputPath = path.join(process.cwd(), 'src', 'lib', 'apryse', 'StructuredOutputLinuxArm64', 'Lib', 'Linux');

		await PDFNet.addResourceSearchPath(structuredOutputPath);

		if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
			throw new Error('StructuredOutputModule is not available.');
		}

		await PDFNet.Convert.fileToPowerPoint(inputPath, outputPath);
	});

	const pptxBuffer = fs.readFileSync(outputPath);

	cleanupFiles([inputPath, outputPath]);

	return pptxBuffer;
}
