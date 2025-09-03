import fs from 'fs';

export function cleanupFiles(paths: string[]) {
	for (const file of paths) {
		if (fs.existsSync(file)) {
			fs.unlinkSync(file);
		}
	}
}
