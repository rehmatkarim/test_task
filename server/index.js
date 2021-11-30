import express from 'express'
import cors from 'cors'
import multer from 'multer'
import * as csv from 'fast-csv'
import * as sizeOf from 'image-size'
// import { promisify } from 'util'
import url from 'url'
import http from 'http'

const storage = multer.memoryStorage()
const upload = multer({ storage })
// sizeOf = promisify(sizeOf)

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is from express.js')
})

app.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.file,"::fileeeeeeeeee");
  const uploadedFile = req.file['buffer'];
  
  // const uploadedFile = req.file
  console.log(uploadedFile, "uploaded file")
  const dataRows = []
  const errors = []

  csv.parseFile(uploadedFile, { headers: true, delimiter:';' })
    .on('error', error => errors.push(error))
    .on('data', data => dataRows.push(data))
    .on('end', () => console.log('Parsing Completed!'))

  for (let row of dataRows) {
    const imageUrl = row.url
    delete row.url
    let dimensions;
    try {
      const parsedUrl = url.parse(imageUrl)
      http.get(parsedUrl, (response) => {
        const chunks = []
        response.on('data', (chunk) => {
          chunks.push(chunk)
        }).on('end', () => {
          const buffer = Buffer.concat(chunks)
          dimensions = sizeOf(buffer)
        })
      })
      // const dimensions = await sizeOf(url)
      row.picture = {
        url: imageUrl,
        width: dimensions.width,
        height: dimensions.height
      }
    } catch (error) {
      errors.push(error)
    }
  }

  res.send({ data: dataRows, errors })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})
