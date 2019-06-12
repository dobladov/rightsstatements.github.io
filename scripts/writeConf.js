const fs = require("fs")
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const writeConf = async () => {
  const { HEAD, REPOSITORY_URL } = process.env
  const repo = REPOSITORY_URL.split('@')[1].replace("github.com/", '')

  if (HEAD && repo) {
    const config = await readFile('./admin/config.yml', 'utf8')
    let replacedConfig = config
      .replace('${CMS_REPO}', repo)
      .replace('${CMS_BRANCH}', HEAD)
    await writeFile('./admin/config.yml', replacedConfig)
    console.info("Configuration replaced")
  } else {
    console.info("The configuration was not replaced")
  }
}

writeConf()