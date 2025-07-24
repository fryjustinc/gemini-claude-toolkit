#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const sourcePath = path.join(__dirname, 'templates', 'gemini.md');
const destPath = path.join(process.cwd(), 'gemini.md');

fs.copyFileSync(sourcePath, destPath);

console.log('gemini.md created successfully!'); 