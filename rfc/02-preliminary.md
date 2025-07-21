## Preliminary

## Core beliefs
### Lead by example
It's better to have a play 


### Convention over configuration 
It is easier to place items at certain positions than be able to modify everyting. 

> **Note**: Be aware that it's good to have an opt-out for more advanced use cases

### Use folder and filenames for convey context and use case
You will see inconsequent usage of folder based or filder based conventions. Also, i prefer to ensure things are called like what their purpose is. E.g. if something is a `route` it should be called `route.ts`, if sth is `i18n` translations it should probably be called `something.i18n.ts`, iof sth is a `command` it should be called `my.command.ts`. I am not yet sold on the complete idea, and it related a bit to file-based routing. It originates from the fact the files normally describe their type. E.g. if you have a `file.tar` it describes it is a file of the type `tar`. If you `gzip` it becomes `file.tar.gz` which basically says. and it is a gzip encoded tar archive of the original named `file`. 


### Be able to go fast and iterate fast 
This includes that for fast prototyping you shouldn't enforce structural conventions that makes it slower to iterate.