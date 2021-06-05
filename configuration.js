`use strict`;

const ABORT_MESSAGE = [
  { color: 'red', content: 'Aborting!' },
  { color: 'white', content: 'See ya. 👋' }
]

const START_MESSAGE = project => [
  { color: 'blue', content: 'Scaffolding Express Project:' },
  { color: 'white', content: `${project.toUpperCase()} 🤯` }
]

const FIRST_STEP_MESSAGE = [
  { color: 'white', content: '01.' },
  { color: 'blue', content: 'Creating Directories and its files' },
  { color: 'white', content: `It goes by so F A S T 🏎️\n` }
]

const SECOND_STEP_MESSAGE = [
  { color: 'white', content: '02.' },
  { color: 'blue', content: 'Installing Project Dependencies!' },
  { color: 'white', content: `It might take a while ⏱️\n` }
]

const END_MESSAGE = [
  { color: 'blue', content: 'You are good to go! Have a good work! 💻\n' },
]

const ABORT_OPTIONS = [ `Yes, I do!`, `No, I do not!` ];
const QUESTIONS = [{
  type: `input`,
  name: `project`,
  message: `What's your project name?`,
  validate: input => !input ? `Please, provide a valid project name! 😑` : true
},{
  type: `input`,
  name: `entities`,
  message: `What are the entities of it? (Example: user,task):`
},{
  type: `list`,
  name: `abort`,
  message: `Do you wanna proceed with the project scaffolding? 🧐`,
  choices: ABORT_OPTIONS
}]

const base = `npm i`
const dev = `--save-dev`

const commands = [
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

const helpers = [{
  name: `index.js`,
  content: `helpers-index`,
  type: `file`
}, {
  name: `constant.helpers.js`,
  content: `helpers-constant`,
  type: `file`
},{
  name: `response.helpers.js`,
  content: `helpers-response`,
  type: `file`
}]

const middleware = [{
  name: `index.js`,
  content: `src-middleware-index`,
  type: `file`
}, {
  name: `token.middleware.js`,
  content: `src-middleware-token`,
  type: `file`
}]

const routes = [{
  name: `default-handler.routes.js`,
  content: `routes-handler`,
  type: `file`
}]

const schemas = [{
  name: `index.js`,
  content: `schemas-index`,
  type: `file`
}]

const srv = [{
    name: `index.js`,
    content: `srv-index`,
    type: `file`
}]

const src = [{
  name: `controller`,
  type: `folder`
}, {
  name: `service`,
  type: `folder`
}]

const folders = [{
  name: 'helpers',
  content: helpers,
  type: `folder`
},{
  name: 'middleware',
  content: middleware,
  type: `folder`
},{
  name: 'routes',
  content: routes,
  type: `folder`
},{
  name: 'schemas',
  content: schemas,
  type: `folder`
},{
  name: 'src',
  content: src,
  type: `folder`
},{
  name: 'srv',
  content: srv,
  type: `folder`
},{
  name: `veja.js`,
  content: `schemas-index`,
  type: `file`
}]

const REGEX = /{{entity}}/g

module.exports = {
  commands,
  folders,

  ABORT_OPTIONS,
  QUESTIONS,
  REGEX,

  START_MESSAGE,
  ABORT_MESSAGE,
  FIRST_STEP_MESSAGE,
  SECOND_STEP_MESSAGE,
  END_MESSAGE
}
