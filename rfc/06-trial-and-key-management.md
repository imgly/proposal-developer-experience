## On Trial start and Key management
There are two improvements to the current system which breaks the developer flow as you need to fill out a form to get a key, and this is disjunct from the environment the developer is in

### (Option 1) Trial with first launch
Inspired by our colleagues at [nutrient.io](https://nutrient.io) the trial flow could be as followed
1. The first time a dev starts the app in the browser, we just request a trial key from the server and store it locally. A smart engineer might just delete the entry but who cares. 
   
2. When the trial expires the user is asked to buy a license / contact sales. 

> **Note** The big win is also that we see everyone really just installing and trying our sdk and launching it once.

### (Option 2) Trial with registration and login (Only with CLI)
When using a scaffolding CLI would optionally also allow us to directly register or login users via a 'desktop app' OAuth 2 user flow and thus also getting the API token directly as well as a user registration from within the developer world. This is purely optional for now. This would be what modern cli tools like `aws` or `claude` do. They both have the option to seemlessly login or provide an api key on startup. Both above don't have anything else. As we don't require any servers or upfront credit cards, we might want to also allow running without registration for trial purposes. We can also get a trial to save directly here and insert into `.env` variables and so forth. The question is, how would we act if someone is not using the CLI.