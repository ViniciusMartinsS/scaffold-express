'use strict'

const chalk = require(`chalk`)
const { COLOR_ENUM } = require(`../configuration`)

const COLORS = {
  [COLOR_ENUM.blue]: chalk.bold.blueBright,
  [COLOR_ENUM.red]: chalk.bold.redBright,
  [COLOR_ENUM.white]: chalk.bold.whiteBright
}

module.exports.info = messages => {
  if (!messages || !Array.isArray(messages) || !messages.length) return

  let content = ``
  messages.forEach(message => {
    content = `${content} ${COLORS[message.color](message.content)}`.trim()
  })

  console.log(COLORS.white(`\n>`), content)
}
