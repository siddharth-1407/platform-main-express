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
	console.log('Platform:', os.platform()); // e.g., 'linux'
	console.log('Architecture:', os.arch()); // e.g., 'x64'

	let structuredOutputPath: string;

	switch (os.platform()) {
		case 'win32':
			structuredOutputPath = path.join(process.cwd(), 'src', 'lib', 'apryse', 'StructuredOutputWindows', 'Lib', 'Windows');
			break;
		case 'darwin':
			structuredOutputPath = path.join(process.cwd(), 'src', 'lib', 'apryse', 'StructuredOutputMac', 'Lib', 'MacOS');
			break;
		case 'linux':
			if (os.arch() === 'arm64') {
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
