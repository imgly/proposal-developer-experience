import { Command } from 'commander';

import { render, renderFilled, PALETTES, getPaletteNames } from 'oh-my-logo';
// npx oh-my-logo "IMG.LY\nSDK" purple  --filled

async function action(options) {
  // Basic ASCII art rendering
  const logo = await renderFilled('IMG.LY\nSDK', {
    palette: 'purple',
    direction: 'horizontal'
  });
  console.log(logo);
}

const command = new Command('banner');
command
  .description('Show banner')
  .action(action);

export default command