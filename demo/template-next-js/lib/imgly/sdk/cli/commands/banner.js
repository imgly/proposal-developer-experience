import { Command } from 'commander';

import {banner} from "../lib/banner.js"

const command = new Command('banner');
command
  .description('Show banner')
  .action(async () => {
    console.log(await banner())
  });

export default command