'use strict'

const { readdirSync, rmSync } = require(`fs`)
const { CONTENT_PREFIX } = require(`../configuration`)

module.exports.clearTmpFile = () => {
  const files = readdirSync(CONTENT_PREFIX)

  files.filter(file => file.includes(`tmp-`))
    .forEach(file => rmSync(`${CONTENT_PREFIX}/${file}`))
}
