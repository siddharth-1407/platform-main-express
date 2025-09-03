import fs from 'fs';
import os from 'os';
import path from 'path';

export function cleanupFiles(paths: string[]) {
	for (const file of paths) {
		if (fs.existsSync(file)) {
			fs.unlinkSync(file);
		}
	}
}

export function getStructuredOutputPath(): string {
	let structuredOutputPath: string;

	switch (os.platform()) {
		case 'linux':
			if (os.arch() === 'arm64' || os.arch() === 'x64') {
				structuredOutputPath = path.join(process.cwd(), 'src', 'lib', 'apryse', 'StructuredOutputLinuxArm64', 'Lib', 'Linux');
			} else {
				structuredOutputPath = path.join(process.cwd(), 'src', 'lib', 'apryse', 'StructuredOutputLinux', 'Lib', 'Linux');
			}
			break;
		default:
			throw new Error(`Unsupported OS: ${os.platform()}`);
	}
	return structuredOutputPath;
}
