import { render, renderFilled, PALETTES, getPaletteNames } from 'oh-my-logo';

async function banner(options) {
  const logo = await renderFilled('IMG.LY\nSDK', {
    palette: 'purple',
    direction: 'horizontal'
  });
  return logo

}

export { banner }