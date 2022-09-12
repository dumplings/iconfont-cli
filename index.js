#!/usr/bin/env node
const { program } = require('@caporal/core')
// const fs = require('fs')
const path = require('path')

program
  .argument('<input>', 'input')
  .argument('<output>', 'output')
  .option('-p, --prefix <word>')
  .action(({ args, options }) => {
    console.log(args, options)
    console.log(path.resolve(__dirname, args.input));
    console.log(path.resolve(__dirname, args.output));
  })

program.run()
