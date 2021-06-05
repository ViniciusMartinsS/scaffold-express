'use strict'

const { readFileSync } = require(`fs`)
const ENCONDING = { encoding: `utf-8` }

/* ENUM SECTION */
const ASSET_TYPE_ENUM = Object.freeze({
  file: `file`,
  folder: `folder`
})

const COLOR_ENUM = Object.freeze({
  blue: `blue`,
  red: `red`,
  white: `white`
})

/* LOGS SECTION */
const ABORT_MESSAGE = [
  { color: COLOR_ENUM.red, content: `Aborting!` },
  { color: COLOR_ENUM.white, content: `See ya. 👋` }
]

const START_MESSAGE = project => [
  { color: COLOR_ENUM.blue, content: `Scaffolding Express Project:` },
  { color: COLOR_ENUM.white, content: `${project.toUpperCase()} 🤯` }
]

const FIRST_STEP_MESSAGE = [
  { color: COLOR_ENUM.white, content: `01.` },
  { color: COLOR_ENUM.blue, content: `Creating Directories and its files` },
  { color: COLOR_ENUM.white, content: `It goes by so F A S T 🏎️\n` }
]

const SECOND_STEP_MESSAGE = [
  { color: COLOR_ENUM.white, content: `02.` },
  { color: COLOR_ENUM.blue, content: `Installing Project Dependencies!` },
  { color: COLOR_ENUM.white, content: `It might take a while ⏱️\n` }
]

const END_MESSAGE = [
  { color: COLOR_ENUM.blue, content: `You are good to go! Have a good work! 💻\n` }
]

/* QUESTIONS/INPUT SECTION */
const ABORT_OPTIONS = [ `Yes, I do!`, `No, I do not!` ]
const QUESTIONS = [ {
  type: `input`,
  name: `project`,
  message: `What's your project name?`,
  validate: input => !input ? `Please, provide a valid project name! 😑` : true
}, {
  type: `input`,
  name: `entities`,
  message: `What are the entities of it? (Example: user,task):`
}, {
  type: `list`,
  name: `abort`,
  message: `Do you wanna proceed with the project scaffolding? 🧐`,
  choices: ABORT_OPTIONS
} ]

/* COMMANDS SECTION */
const FOLDERS = JSON.parse(readFileSync(`${__dirname}/structure.json`, ENCONDING))

const base = `npm i`
const dev = `--save-dev`

const COMMANDS = [
  `npm init -y`,
  `${base} joi`,
  `${base} bcrypt`,
  `${base} cors`,
  `${base} dotenv`,
  `${base} express`,
  `${base} jsonwebtoken`,
  `${base} sequelize`,
  `${base} sequelize`,
  `${base} chai ${dev}`,
  `${base} eslint ${dev}`,
  `${base} eslint-config-standard ${dev}`,
  `${base} eslint-plugin-import ${dev}`,
  `${base} eslint-plugin-mocha ${dev}`,
  `${base} eslint-plugin-node ${dev}`,
  `${base} eslint-plugin-promise ${dev}`,
  `${base} eslint-plugin-standard ${dev}`,
  `${base} husky ${dev}`,
  `${base} mocha ${dev}`,
  `${base} nyc ${dev}`
]

const CONTENT_PREFIX = `${__dirname}/content`

module.exports = {
  ABORT_OPTIONS,
  ABORT_MESSAGE,
  ASSET_TYPE_ENUM,
  COLOR_ENUM,
  COMMANDS,
  CONTENT_PREFIX,
  ENCONDING,
  END_MESSAGE,
  FIRST_STEP_MESSAGE,
  FOLDERS,
  QUESTIONS,
  SECOND_STEP_MESSAGE,
  START_MESSAGE
}
