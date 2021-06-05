`use strict`

const { clearTmpFile } = require(`./cleanup.command`)
const { handleProjectStructure } = require(`./structure.command`)
const { installDependencies } = require(`./dependencies.command`)
const { setEntityCustomContent } = require(`./content.command`)

module.exports = {
  clearTmpFile,
  handleProjectStructure,
  installDependencies,
  setEntityCustomContent
}
