#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';

const command = process.argv[2];

if (!command) {
  console.error('Please specify a command: init or server');
  process.exit(1);
}

const scriptPath = path.join(__dirname, `${command}.js`);
const node = process.execPath;

const child = spawn(node, [scriptPath, ...process.argv.slice(3)], {
  stdio: 'inherit',
});

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`Command ${command} failed with code ${code}`);
    process.exit(1);
  }
}); 