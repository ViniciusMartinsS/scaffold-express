'use strict'

const { execSync } = require(`child_process`)
const { bar, log } = require(`../helpers`)
const { COMMANDS, ENCONDING, SECOND_STEP_MESSAGE } = require(`../configuration`)

module.exports.installDependencies = folder => {
  log.info(SECOND_STEP_MESSAGE)

  const instanceBar = bar.setupBar(COMMANDS.length)

  COMMANDS.forEach((command, index) => {
    execSync(command, { cwd: folder, stdio: `pipe`, ...ENCONDING })
    bar.updateBar(instanceBar, index + 1)
  })

  bar.stopBar(instanceBar)
}
