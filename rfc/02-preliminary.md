## Preliminary

## Core beliefs
### Lead by example
It's better to have a playground


### Convention over configuration 
It is easier to place items at certain positions than be able to modify everything. 

> **Note**: Be aware that it's good to have an opt-out for more advanced use cases

### Use folder and filenames to convey context and use case
You will see inconsistent usage of folder based or file based conventions. Also, I prefer to ensure things are called like what their purpose is. E.g. if something is a `route` it should be called `route.ts`, if something is `i18n` translations it should probably be called `something.i18n.ts`, if something is a `command` it should be called `my.command.ts`. I am not yet sold on the complete idea, and it relates a bit to file-based routing. It originates from the fact that files normally describe their type. E.g. if you have a `file.tar` it describes it is a file of the type `tar`. If you `gzip` it becomes `file.tar.gz` which basically says it is a gzip encoded tar archive of the original named `file`. 


### Be able to go fast and iterate fast 
This includes that for fast prototyping you shouldn't enforce structural conventions that make it slower to iterate.