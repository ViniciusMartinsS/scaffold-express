'use strict'

const { readFileSync, writeFileSync } = require('fs')
const { folders, REGEX } = require('../configuration')

module.exports.handleFileContent = (file, dir, contentPath) => {
  const content = readFileSync(`./content/${contentPath}`, { encoding: 'utf-8' })
  writeFileSync(`${dir}/${file}`, content, { encoding: 'utf-8' })
}

module.exports.setEntityCustomContent = entities => {
  if (!entities || !entities.length) return

  entities.split(',').forEach(entity => executeSetEntityCustomContent(entity))
}

function executeSetEntityCustomContent (entity) {
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
  const fileContent = readFileSync(`./content/${folder}`, { encoding: 'utf-8' }).replace(REGEX, entity)
  writeFileSync(`./content/tmp-${folder}-${entity}`, fileContent, { encoding: 'utf-8' })
}
