import { Command } from 'commander';


const command = new Command('greet');
command
  .description('Greets the user')
  .option('-n, --name <string>', 'Name of the user', 'World')
  .action((options) => {
    console.log(`Hello, ${options.name}!`);
  });

export default command