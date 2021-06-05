`use strict`

const { readFileSync, writeFileSync } = require(`fs`)
const { CONTENT_PREFIX, ENCONDING, FOLDERS } = require(`../configuration`)

const REGEX = /{{entity}}/g

module.exports.handleFileContent = (file, dir, contentPath) => {
  const content = readFileSync(`${CONTENT_PREFIX}/${contentPath}`, ENCONDING)
  writeFileSync(`${dir}/${file}`, content, ENCONDING)
}

module.exports.setEntityCustomContent = entities => {
  if (!entities || !entities.length) return

  entities.split(`,`).forEach(entity => executeSetEntityCustomContent(entity))
}

function executeSetEntityCustomContent (entity) {
  const index = FOLDERS.findIndex(({ name }) => name === `src`)

  FOLDERS[index].content = FOLDERS[index].content
    .map(folder => {
      let fileName = folder.name

      if (folder.name === `controller`) {
        fileName = `tmp-${folder.name}-${entity}`
        createFileContentFromBase(entity, folder.name)
      }

      const content = [{ name: `${entity}.${folder.name}.js`, content: fileName, type: `file` }]
      return { ...folder, ...(folder.content && { content: [ ...folder.content, ...content ] } || { content }) }
    })
}

function createFileContentFromBase (entity, folder) {
  const fileContent = readFileSync(`${CONTENT_PREFIX}/${folder}`, ENCONDING).replace(REGEX, entity)
  writeFileSync(`${CONTENT_PREFIX}/tmp-${folder}-${entity}`, fileContent, ENCONDING)
}
