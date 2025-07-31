#!/usr/bin/env node

import { Command } from 'commander';

import help from './commands/help.js'
import banner from './commands/banner.js'

const program = new Command();

const name = process.argv0
program
  .name(name)
  .description('A simple CLI scaffold in TypeScript')
  .version('0.1.0');


program.addCommand(help);
program.addCommand(banner);

// If no command is provided, run banner as default
if (process.argv.length === 2) {
  process.argv.push('banner');
}

program.parse(process.argv);