'use strict'

const cliProgress = require('cli-progress')

module.exports.setupBar = length => {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  bar.start(length, 0)
  return bar
}

module.exports.updateBar = (bar, value) => bar.update(value)

module.exports.stopBar = bar => bar.stop()
