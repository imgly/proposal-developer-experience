import { Command } from 'commander';
import * as prompts from '@clack/prompts';

import { banner } from '../lib/banner.js'

import * as errors from '../lib/errors.js'
import { findProjectRoot, validateChoice } from '../lib/helper.js'
import { detectJsFramework } from '../lib/detect_js_framework.js';


async function choose_platform(opts) {
  const options = [
    { value: 'web', label: 'Web', hint: 'Browser' },
    { value: 'mobile', label: 'Mobile', hint: 'iOS, Android, Flutter, etc.' },
    { value: 'desktop', label: 'Desktop', hint: 'MacOs, Electron, etc.' },
    { value: 'server', label: 'Server', hint: 'Node.js' }
  ]
  const value = opts.platform ?? await prompts.select({
    message: 'Pick your platform.',
    options: options
  });

  if (prompts.isCancel(value)) throw new errors.OperationCancelledError()

  return validateChoice(value, options.map(v => v.value))
}


async function choose_framework(opts) {
  if (opts.platform === "web") {

    const options = [
      { value: 'nextjs', label: 'Next.js', hint: 'Next.js by Vercel' },
    ]
    const detected = detectJsFramework(await findProjectRoot())
    const ordered = [
      ...(options
        .filter(f => f.value === detected)
        .map(v => ({ ...v, hint: v.hint + " (detected)" }))),
      ...options
        .filter(f => f.value !== detected),
    ];

    const value = opts.framework ?? await prompts.select({
      message: 'Pick your framework.',
      options: ordered
    })
    if (prompts.isCancel(value)) throw new errors.OperationCancelledError()
    return validateChoice(value, options.map(v => v.value))
  }

  throw new errors.NotImplementedError(`The platform ${opts.platform} has not been implemented yet.`)
}

async function choose_language(opts) {
  if (opts.platform === "web") {
    const options = [
      { value: 'ts', label: 'Typescript' },
      { value: 'js', label: 'Javascript' },
    ]
    const value = opts.language ?? await prompts.select({
      message: 'Pick your programming language.',
      options: options
    })
    if (prompts.isCancel(value)) throw new errors.OperationCancelledError()
    return validateChoice(value, options.map(v => v.value))
  }


  throw new errors.NotImplementedError(`The programming language ${opts.language} has not been implemented yet.`)
}

async function choose_solution(opts) {
  if (opts.platform === "web") {
    const options = [
      { value: 'photoeditor', label: 'PhotoEditor' },
      { value: 'videoeditor', label: 'VideoEditor' },
      { value: 'designeditor', label: 'DesignEditor' },
    ]
    const value = opts.solution ?? await prompts.select({
      message: 'Pick your preferred solution configuration.',
      options: options
    })


    if (prompts.isCancel(value)) throw new errors.OperationCancelledError()
    
    return validateChoice(value, options.map(v => v.value))
  }

  throw new errors.NotImplementedError(`The programming language ${opts.lang} has not been implemented yet.`)
}


async function determine_options(opts) {
  opts.platform = await choose_platform(opts)
  opts.framework = await choose_framework(opts)
  opts.language = await choose_language(opts)
  opts.solution = await choose_solution(opts)

  return opts

}
async function init(options) {
  prompts.intro(await banner());
  try {
    options = await determine_options(options);
  } catch (err) {
    if (err instanceof errors.OperationCancelledError) {
      prompts.cancel('Operation cancelled.');
    } 
    if (err instanceof errors.NotImplementedError) {
      prompts.log.info(`Not implemented (yet): ${err.message}`)
    }
    else {
      prompts.log.error(`An unknown error occured: ${err.message}`)
    }
    process.exit(0);
  }



  prompts.outro(`
    You're all set! with
    ${JSON.stringify(options, null, 2)}
    `);
}


const command = new Command('new');

command
  .description('Create new project with IMG.LY SDK.')
  .option('-p, --platform <string>', 'Specify target platform (web, mobile, etc.)')
  .option('-f, --framework <string>', 'Specify framework')
  .option('-l, --language <string>', 'Specify preferred programming language')
  .option('-s, --solution <string>', 'Specify the solution (photo, video, etc.)')
  // .option('--public <public>', 'The public dir where assets are placed', 'public')
  // .option('--prefix <prefix>', 'Installation prefix', 'imgly')
  .option('--directory [directory]', "Specify the destination directory", process.cwd())
  .action(init);

export default command