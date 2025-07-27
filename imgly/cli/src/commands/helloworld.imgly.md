--
<!-- JSON RPC definition of the command -->
<!--  name is implied by filename unless specified-->
name: helloworld
summary: Create a git commit
description: More to know more to tell
tags: [one, two, three] 
examples:

errors:
    - name: ValidationError
      code: 200  
      message: Call me cracy {VAR:none}

params:
  - name: limit
    short: l
    description: How many items to return at one time (max 100)
    required: false
    schema:
      type: integer
      minimum: 1
result:  
---
<!-- This is all passed as return value and implicitely a message with content text or attachments with "@"-->
<!-- this is the implementation and all is returned  -->


## Context

!```bash { param 1} 
echo "hello"
echo "world" 
```


!```javascript
console.log("hello") 
console.log("world)
```


- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

Based on the above changes, create a single git commit.


## Attachments
@attachfile 
@attachotherfile