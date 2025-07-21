## On Getting started

Getting start flow should be as straight forward as possible as possible. From my research the things I liked most a based on a cli that can easily be used via `npx`. Examples are 

- [mastra](https://mastra.ai/)
- [shadcn](https://ui.shadcn.com/docs/installation/astro)

Here we use a console command that bootstraps the imgly sdk for a certain framework and use case/solution 

```bash 
   npx @imgly/sdk init 
   npx imgly-sdk init 
   
   # imgly was purposly kept open for later usage and to allow a git like subcommand architecture like imgly sdk init 
   # npx imgly init 
```

Note, that this is basically removing the necessary of all the dispatch logic on the web, that is still important to find the right docs but this can be done in the console. Also note that we could also detect the framework at use if we are in a repository that contains a certain platform

Here is the decision tree

```shell
Which platform are you using? [web (detected)]
  1. web
  2. mobile
  3. desktop 
  4. server
```
For simplicity we focus on the web here first but it would be extensible.

Therefore, the choices for web are

```shell
Which platform are you using? [React (detected)]
  1. Vanilla
  2. Angular
  3. React 
  4. Vue
  5. Svelte
```

Followed by

```shell
What do you want to build? [React (detected)]
  1. PhotoEditor
  2. VideoEditor
  3. Apparel Editor
  4. Other
```

(Option) this would allow us future usage of `Agents` to also help with the whole onboarding. Note: We could even detect if an agent is installed at the system and use it for further things if wanted.


As an alterantive we can also just install the sdk as we have done before, however I would prefer to simplify it to [one package](./10-engine-ui-confusion.md) to simplify the installation.