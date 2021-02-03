const path = require('path')
const fs = require('fs')
const v = require('vaxic')

const quoteFileContents = fs.readFileSync(path.join(__dirname, 'quotes.txt')).toString()

const quotes = []

quoteFileContents.split('\n').forEach((line) => {

    const lineParts = line.split('-')

    quotes.push({
        'quote': lineParts[0],
        'by': lineParts[1]
    })
})

const app = new v()

app.add('GET', '/api/quote', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.end(JSON.stringify(randomQuote))
})

app.add('GET', (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
        'error': 'Page not found'
    }))
})

let port = 8080;

app.listen(port, () => {
    console.log('API Listening on :', port);
})