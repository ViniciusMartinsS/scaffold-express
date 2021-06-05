`use strict`

const chalk = require(`chalk`)

const COLORS = {
  blue: chalk.bold.blueBright,
  white: chalk.bold.white,
  red: chalk.bold.redBright
}

module.exports.info = messages => {
  if (!messages || !Array.isArray(messages) || !messages.length) return

  let content = ``
  messages.forEach(message => content = `${content} ${COLORS[message.color](message.content)}`.trim())
  console.log(COLORS.white(`\n>`), content)
}
