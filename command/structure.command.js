'use strict'

const { mkdirSync } = require(`fs`)
const { handleFileContent } = require(`./content.command`)
const { bar, log } = require(`../helpers`)
const { ASSET_TYPE_ENUM, FIRST_STEP_MESSAGE } = require(`../configuration`)

let count = 0

module.exports.handleProjectStructure = (dir, content) => {
  log.info(FIRST_STEP_MESSAGE)

  const instanceBar = bar.setupBar(content.length)
  executeProjectStructure(dir, content, instanceBar)
}

function executeProjectStructure (dir, content, instanceBar) {
  if (!content || !content.length) return

  content.forEach(info => {
    instanceBar && bar.updateBar(instanceBar, ++count)

    if (info.type === ASSET_TYPE_ENUM.file) {
      return handleFileContent(info.name, dir, info.content)
    }

    if (info.type === ASSET_TYPE_ENUM.folder) {
      mkdirSync(`${dir}/${info.name}`)
      return executeProjectStructure(`${dir}/${info.name}`, info.content)
    }
  })

  instanceBar && bar.stopBar(instanceBar)
}
