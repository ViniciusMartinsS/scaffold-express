`use strict`

const { exit } = require(`process`)
const { mkdirSync } = require(`fs`)
const { prompt } = require(`inquirer`)

const CMD = require(`./command`)
const { log } = require(`./helpers`)
const {
  ABORT_OPTIONS,
  ABORT_MESSAGE,
  END_MESSAGE,
  QUESTIONS,
  FOLDERS,
  START_MESSAGE
} = require(`./configuration`)

;(async () => {
  const { abort, entities, project } = await prompt(QUESTIONS)

  if (ABORT_OPTIONS.indexOf(abort) > 0) {
    log.info(ABORT_MESSAGE)
    exit(200)
  }

  const initialMessage = START_MESSAGE(project)
  log.info(initialMessage)

  const workDir = `./${project}`

  mkdirSync(workDir)

  CMD.setEntityCustomContent(entities)
  CMD.handleProjectStructure(workDir, FOLDERS)
  CMD.installDependencies(workDir)
  CMD.clearTmpFile()

  log.info(END_MESSAGE)
})()
