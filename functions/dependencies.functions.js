'use strict'

const { execSync } = require('child_process')
const bar = require('./bar.functions')
const log = require('./log.functions')
const { commands, SECOND_STEP_MESSAGE } = require('../configuration')

module.exports.installDependencies = folder => {
  log.info(SECOND_STEP_MESSAGE)

  const instanceBar = bar.setupBar(commands.length)

  commands.forEach((command, index) => {
    execSync(command, { cwd: folder, encoding: 'utf-8', stdio : 'pipe' })
    bar.updateBar(instanceBar, index + 1)
  })

  bar.stopBar(instanceBar)
}
