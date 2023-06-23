const express = require('express')
const HTMLtoJSX = require('htmltojsx')

const app = express()

app.use(express.text())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const html = req.body.replace(/class="([^"]*)"/g, (match, classValue) => {
    const modifiedClassValue = classValue
      .split(' ')
      .filter(word => !word.includes('dark'))
      .join(' ')
    return `class="${modifiedClassValue}"`
  })

  const converter = new HTMLtoJSX({
    createClass: false,
  })
  const jsx = converter.convert(html)
  res.send(jsx)
})

app.listen(8080, () => console.log('Listening on port 8080!'))
