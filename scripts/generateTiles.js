const path = require('path')
const fs = require('fs')
const { readdirSync } = require('fs')

const SRC_DIR_PATH = path.join(__dirname, '..', 'gameTileSets')
const TARGET_DIR_PATH = path.join(__dirname, '..', 'assets', 'tiles')
const TARGET_FILE_PATH = path.join(__dirname, '..', 'assets', 'assetsMap.json')

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

function generateTiles(folder) {
  const sourceDir = path.join(SRC_DIR_PATH, folder)
  const targetDir = path.join(TARGET_DIR_PATH, folder)

  let files = undefined
  let assetsMap = undefined
  try {
    files = fs.readdirSync(sourceDir)
    assetsMap = files.reduce((memo, file, i) => ({ ...memo, [i]: file }), {})
  } catch (error) {
    console.error('>>> Error reading source directory at', sourceDir, error)
    process.exit(1)
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }

  try {
    files.forEach((file, i) =>
      fs.copyFileSync(
        path.join(sourceDir, file),
        path.join(targetDir, `${i}.png`)
      )
    )
  } catch (error) {
    console.error('>>> Error copying files from', sourceDir, error)
    process.exit(1)
  }

  try {
    fs.writeFileSync(
      TARGET_FILE_PATH,
      JSON.stringify(assetsMap, undefined, 2),
      'utf8'
    )
  } catch (error) {
    console.error('>>> Error writing assets map', error)
    process.exit(1)
  }

  console.info('>>> Files successfully copied to', targetDir)
}

getDirectories(SRC_DIR_PATH).forEach(generateTiles)
