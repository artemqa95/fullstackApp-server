const path = require('path')
const express = require('express');
const cors = require('cors')
const fileMiddleware = require('./middleware/file')
const routes = require('./routes/routes')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileMiddleware.single('image'))
app.use(express.static(path.join(__dirname, 'public')))


const corsOptions = {
    origin : '*',
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    optionsSuccessStatus : 200
}

app.use('/', cors(corsOptions), routes);

const PORT = 3001
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
