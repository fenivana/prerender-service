const logger = require('./logger')
const fetch = require('node-fetch')

const RETRY = 3
const TIMEOUT = 10

async function callback(callbackURL, error, doc, cacheStatus) {
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'kasha',
    'Kasha-Code': error ? error.code : 'OK'
  }

  if (cacheStatus) {
    headers['Kasha-Cache-Status'] = cacheStatus
  }

  const init = {
    method: 'POST',
    body: JSON.stringify(error || doc),
    headers,
    timeout: TIMEOUT
  }

  let tried = 0
  while (1) { // eslint-disable-line no-constant-condition
    try {
      const response = await fetch(callbackURL, init)
      logger.log(`GET ${doc.site}/${doc.path} ${doc.status}. Callback ${callbackURL} ${response.status}.`)
      break
    } catch (e) {
      tried++
      if (tried >= RETRY) {
        logger.log(`GET ${doc.site}/${doc.path} ${doc.status}. Callback ${callbackURL} ${e.message}.`)
        break
      }
    }
  }
}

module.exports = callback
