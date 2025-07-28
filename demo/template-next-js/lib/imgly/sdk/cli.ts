#!/usr/bin/env ts-node

import { Command } from 'commander';
import greet from './cli/commands/greet'
import help from './cli/commands/help'

const program = new Command();

program
  .name('my-cli')
  .description('A simple CLI scaffold in TypeScript')
  .version('0.1.0');


program.addCommand(greet);
program.addCommand(help);


program.parse(process.argv);
