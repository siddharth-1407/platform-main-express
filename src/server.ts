import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 4000;

// Ensure temp folder exists (you can also use /tmp on Render)
const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
	fs.mkdirSync(tempDir, { recursive: true });
	console.log('Created temp folder at:', tempDir);
}

app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`);
});
