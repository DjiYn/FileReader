import 'dotenv/config'
import Express from 'express'
import { readdirSync, statSync } from 'node:fs'
import path from 'path'
import { store } from './store.js'
import { loadFile, setNotActive } from './fileStateSlice.js'

const app = Express()
const port = process.env.PORT || 3000

const readFilesFromDir = (dirName) => {
  try {
    const fileNames = []
    const files = readdirSync(dirName)

    for (const file of files) {
      const fullPath = path.join(dirName, file);
      const stat = statSync(fullPath);

      if (stat.isFile()) {
        fileNames.push(file)
      } else if (stat.isDirectory()) {
        readFilesFromDir(fullPath).map(item => fileNames.push(item))
      }
    }

    return fileNames
  } catch (err) {
    console.error('Error reading directory:', err)
  }
}

readFilesFromDir(process.env.DIRECTORY_PATH).map(item => store.dispatch(loadFile(item)))

app.get('/list', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(store.getState().fileState)
})

app.get('/scan', (req, res) => {
  store.dispatch(setNotActive())
  readFilesFromDir(process.env.DIRECTORY_PATH).map(item => store.dispatch(loadFile(item)))
  res.send('Scanned path: ' + process.env.DIRECTORY_PATH)
})

app.get('/download-state', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Content-Disposition', 'attachment; filename="download-state.json"')
  res.send(store.getState().fileState)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})