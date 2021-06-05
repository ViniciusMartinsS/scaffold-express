'use strict'

const { mkdirSync } = require('fs')
const { handleFileContent } = require('./content.functions')
const bar = require('./bar.functions')
const log = require('./log.functions')
const { FIRST_STEP_MESSAGE } = require('../configuration')

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

    if (info.type === 'file') {
      return handleFileContent(info.name, dir, info.content)
    }

    if (info.type === 'folder') {
      mkdirSync(`${dir}/${info.name}`)
      return executeProjectStructure(`${dir}/${info.name}`, info.content)
    }

    throw new Error('Type does not exist!')
  })

  instanceBar && bar.stopBar(instanceBar)
}
