# jscodeshifts

These are primarily used to make sweeping changes to entities.

## Step 1: write the codeshift

see Entity_editorTypeToLayer.js as an example

## Step 2: run it

run it as a dry run
`jscodeshift -t ./codeshifts/<codeshift-to-run> --extensions=<ts|tsx> --parser=<ts|tsx> <path> --print --dry`

For example
`jscodeshift -t ./codeshifts/Entity_editorTypeToLayer.js --extensions=tsx --parser=tsx ./src/entities/Goomba.tsx --print --dry`

now run it for real by removing `--dry` and `--print`

## Step 3: prettier

run prettier on the changed files to make sure they conform to smaghetti's prettier config

`yarn prettier --config .prettierrc --write <path-to-changed-files>

## resources

https://github.com/elliottsj/jscodeshift-typescript-example

