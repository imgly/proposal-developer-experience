import { Command } from 'commander';

import * as constants from '../lib/constants.js'
import * as helper from '../lib/helper.js'
import { detectJsFramework } from '../lib/detect_js_framework.js'
import { detectMobileFramework } from '../lib/detect_mobile_framework.js'

const command = new Command('debug');

command
    .description("Output development debug information")
    .action(async (options) => {
        const projectRoot = await helper.findProjectRoot()
        const debugInfo = {
            name: constants.name,
            description: constants.description,
            version: constants.version,
            projectRoot: projectRoot,
            framework: {
                js: detectJsFramework(projectRoot),
                mobile: detectMobileFramework(projectRoot)
            }

        }
        console.log(JSON.stringify(debugInfo, null, 2))

    });

export default command