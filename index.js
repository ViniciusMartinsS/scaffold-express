'use strict'

const { exit } = require('process')
const { mkdirSync } = require('fs')
const { prompt } = require('inquirer')

const {
  ABORT_OPTIONS,
  QUESTIONS,
  ABORT_MESSAGE,
  END_MESSAGE,
  START_MESSAGE,
  folders
} = require('./configuration')

const {
  clearTmpFile,
  handleProjectStructure,
  installDependencies,
  log,
  setEntityCustomContent
} = require('./functions')

;(async () => {
  const { abort, entities, project } = await prompt(QUESTIONS)

  if (ABORT_OPTIONS.indexOf(abort) > 0) {
    log.info(ABORT_MESSAGE)
    exit(200)
  }

  const message = START_MESSAGE(project)
  log.info(message)

  const workDir = `./${project}`

  mkdirSync(workDir)
  setEntityCustomContent(entities)
  handleProjectStructure(workDir, folders)
  installDependencies(workDir)
  clearTmpFile()

  log.info(END_MESSAGE)
})()
