
import { Command } from 'commander';
import * as constants from '../lib/constants.js'
import help from './help.js'
import newProject from './new.js'
import debug from './debug.js'


const command = new Command();

command
  .name(constants.name)
  .description(constants.description)
  .version(constants.version)
  .addCommand(newProject)
  // .addCommand(help)
  .addCommand(debug)



export default command
