#!/usr/bin/env node
import { program } from '@caporal/core'
import fs from 'fs'
import path from 'path'
import { webfont } from 'webfont'
import chalk from 'chalk'

program
  .argument('<input>', 'input')
  .argument('<output>', 'output')
  .option('-p, --prefix <word>', 'prefix name for class and filename', {
    default: 'dy' // means: dynamic
  })
  .action(({ args, options }) => {
    const input = path.resolve(process.cwd(), args.input)
    const output = path.resolve(process.cwd(), args.output)
    const prefix = options.prefix
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }
    webfont({
      files: `${input}/**/*.svg`,
      fontName: `${prefix}-icon`,
      template: 'node_modules/webfont/templates/template.css.njk'
    }).then(result => {
      fs.writeFileSync(`${output}/${prefix}-icon.ttf`, result.ttf)
      fs.writeFileSync(`${output}/${prefix}-icon.eot`, result.eot)
      fs.writeFileSync(`${output}/${prefix}-icon.woff`, result.woff)
      fs.writeFileSync(`${output}/${prefix}-icon.woff2`, result.woff2)
      fs.writeFileSync(`${output}/${prefix}-icon.css`, result.template)
      console.log(chalk.bgGreen(' [@dumplings/iconfont] '), chalk.green(`generate ${prefix}-icon files finish:`, output))
    })
  })

program.run()
