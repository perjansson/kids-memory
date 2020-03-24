const path = require('path')
const fs = require('fs')

const SRC_DIR_PATH = path.join(__dirname, '..', 'gameTileSets', 'animals')
const TARGET_DIR_PATH = path.join(__dirname, '..', 'assets', 'tiles')
const TARGET_FILE_PATH = path.join(__dirname, '..', 'assets', 'assetsMap.json')

function generateTiles() {
  let files = undefined
  let assetsMap = undefined
  try {
    files = fs.readdirSync(SRC_DIR_PATH)
    assetsMap = files.reduce((memo, file, i) => ({ ...memo, [i]: file }), {})
  } catch (error) {
    console.error('>>> Error reading source directory at', SRC_DIR_PATH, error)
    process.exit(1)
  }

  if (!fs.existsSync(TARGET_DIR_PATH)) {
    fs.mkdirSync(TARGET_DIR_PATH)
  }

  try {
    files.forEach((file, i) =>
      fs.copyFileSync(
        path.join(SRC_DIR_PATH, file),
        path.join(TARGET_DIR_PATH, `${i}.png`)
      )
    )
  } catch (error) {
    console.error('>>> Error copying files from', SRC_DIR_PATH, error)
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

  console.info('>>> Files successfully copied to', TARGET_DIR_PATH)
}

generateTiles()
