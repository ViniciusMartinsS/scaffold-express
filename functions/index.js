'use strict'

const log = require('./log.functions')
const { installDependencies } = require('./dependencies.functions')
const { setEntityCustomContent } = require('./content.functions')
const { handleProjectStructure } = require('./structure.functions')
const { clearTmpFile } = require('./cleanup.functions')

module.exports = {
  clearTmpFile,
  handleProjectStructure,
  installDependencies,
  log,
  setEntityCustomContent
}
