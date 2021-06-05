'use strict'

const { readdirSync, rmSync } = require('fs')

module.exports.clearTmpFile = () => {
  const dir = `./content`
  const files = readdirSync(dir)

  files.filter(file => file.includes(`tmp-`))
    .forEach(file => rmSync(`${dir}/${file}`))
}
