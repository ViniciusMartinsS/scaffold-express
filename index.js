'use strict'

const { execSync } = require('child_process')
const { writeFileSync, mkdirSync, readFileSync, readdirSync, rmSync } = require('fs')
const { prompt } = require('inquirer')
const cliProgress = require('cli-progress')

const chalk = require('chalk')
const error = chalk.bold.red
const success = chalk.bold.blueBright
const peace = chalk.bold.white

const { commands, folders, QUESTIONS, ABORT_OPTIONS } = require('./configuration')
const { exit } = require('process')

;(async () => {
  const { abort, entities, project } = await prompt(QUESTIONS)

  if (ABORT_OPTIONS.indexOf(abort) > 0) {
    console.log(error(`\n> Aborting! See ya. 👋\n`))
    exit(200)
  }

  console.log(peace('\n>'), success(`Scaffolding Express Project:`), peace(`${project.toUpperCase()} 🤯`))

  const workDir = `./${project}`

  if (entities) {
    entities.split(',').forEach(entity => setEntityCustomContent(entity))
  }

  mkdirSync(workDir)
  createDirectoryStructure(workDir, folders)
  installDependencies(workDir)
  clearTmpFile()

  console.log(peace('\n>'), success(`You are good to go! Have a good work! 💻`))
})()

function clearTmpFile() {
  const dir = `./content`
  const files = readdirSync(dir)

  files.filter(file => file.includes(`tmp-`))
    .forEach(file => rmSync(`${dir}/${file}`))
}

function installDependencies(folder) {
  console.log(peace('\n02.'), success(`Installing Project Dependencies!`), error(`It might take a while ⏱️\n`))

  const bar = setupBar(commands.length)

  commands.forEach((command, index) => {
    execSync(command, { cwd: folder, encoding: 'utf-8', stdio : 'pipe' })
    bar.update(index + 1)
  })

  bar.stop()
}

function createDirectoryStructure (dir, content) {
  if (!content || !content.length) return

  content.forEach(info => {
    if (info.type === 'file') {
      return createFileAndAddContent(info.name, dir, info.content)
    }

    if (info.type === 'folder') {
      mkdirSync(`${dir}/${info.name}`)
      return createDirectoryStructure(`${dir}/${info.name}`, info.content)
    }

    throw new Error('Type does not exist!')
  })
}

function createFileAndAddContent (file, dir, contentPath) {
  const content = readFileSync(`./content/${contentPath}`, { encoding: 'utf-8' })
  writeFileSync(`${dir}/${file}`, content, { encoding: 'utf-8' })
}

function setupBar(length) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  bar.start(length, 0)
  return bar
}

function setEntityCustomContent (entity) {
  if (!entity) return

  const index = folders.findIndex(({ name }) => name === 'src')
  folders[index].content = folders[index].content
    .map(folder => {
      let fileName = folder.name

      if (folder.name === 'controller') {
        fileName = `tmp-${folder.name}-${entity}`
        createFileContentFromBase(entity, folder.name)
      }

      const content = [{ name: `${entity}.${folder.name}.js`, content: fileName, type: 'file' }]
      return { ...folder, ...(folder.content && { content: [ ...folder.content, ...content ] } || { content }) }
    })
}

function createFileContentFromBase (entity, folder) {
  const REGEX = /{{entity}}/g

  const fileContent = readFileSync(`./content/${folder}`, { encoding: 'utf-8' }).replace(REGEX, entity)
  writeFileSync(`./content/tmp-${folder}-${entity}`, fileContent, { encoding: 'utf-8' })
}
