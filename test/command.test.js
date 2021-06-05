/* eslint-disable node/no-unpublished-require */
/* eslint-env mocha */
/* eslint no-debugger: off */

const { existsSync, rmdirSync } = require('fs')
const { DOWN, ENTER } = require(`inquirer-test`)

const { expect } = require(`chai`)

const run = require(`inquirer-test`)
const stripAnsi = require(`strip-ansi`)

const { TEST_DIRECTORY, ...Mocks } = require(`./mocks`)

describe(`Command Test Suite`, () => {
  it(`Expect show message reminding user to add their project name`, async () => {
    try {
      const response = await run([ `./index.js` ], [ ENTER ])
      const responseAsUTF8 = stripAnsi(response).split(`>>`)[1].trim()
      expect(responseAsUTF8).to.be.equal(Mocks.assertion.invalidName)
    } catch (error) {
      expect(error).to.be.equal(undefined)
    }
  })

  it(`Expect to abort`, async () => {
    try {
      const response = await run([ `./index.js` ], [ 'Task', ENTER, 'user,task', ENTER, DOWN, ENTER ])
      const responseAsUTF8 = stripAnsi(response).split(`>`)[1].trim()

      console.log(responseAsUTF8)
      expect(responseAsUTF8).to.be.equal(Mocks.assertion.abort)
    } catch (error) {
      expect(error).to.be.equal(undefined)
    }
  })

  it(`Expect to create a project`, async () => {
    try {
      console.log('RUNS NPM INSTALL DEPENDENCY - MIGHT TAKE A WHILE!')

      const response = await run([ `./index.js` ], [ TEST_DIRECTORY, ENTER, 'user,task', ENTER, ENTER ])
      const responseAsUTF8 = stripAnsi(response).split(`>`)[1].trim()

      expect(responseAsUTF8).to.be.equal(Mocks.assertion.success)
      expect(existsSync(`./${TEST_DIRECTORY}`)).to.be.equal(true)
    } catch (error) {
      expect(error).to.be.equal(undefined)
    }
  })

  after(() => {
    rmdirSync(`./${TEST_DIRECTORY}`, { recursive: true })
  })
})
