const {Router} = require('express')
const mysql = require('mysql2/promise')
const fs = require('fs')
const shajs = require('sha.js')
const router = Router()

const dbConfig = {
    host: "localhost",
    user: "root",
    database: "website",
    password: "root"
}
async function requestToDb(request) {
    const connection = await mysql.createConnection(dbConfig)
    const [rows] = await connection.execute(request);
    connection.end()
    return rows
}

function deleteImage(name) {
    fs.unlink(`./images/${name}`, function(err) {
        if(err && err.code === 'ENOENT') {
            console.info("Image doesn't exist, won't remove it.");
        } else if (err) {
            console.error("Error occurred while trying to remove file");
        } else {
            console.info(`Image has been removed`);
        }
    });
}

// CARDS

router.get('/cardsinfo', async (req, res) => {
    const dbRequest = 'SELECT * FROM products;'
    res.json(await requestToDb(dbRequest))
})

router.post('/addcard', async (req, res) => {
    const body = req.body
    const imageName = req.file.filename
    const dbRequest = `INSERT INTO PRODUCTS (id, name, description, price, picture) VALUES (null, '${body.name}', '${body.description}', '${body.price}', '${imageName}');`
    await requestToDb(dbRequest)
    res.end()
})


router.delete('/removecard', async (req, res) => {
    const body = req.body
    const dbRequest = `DELETE FROM products WHERE id=${req.body.id}`
    await requestToDb(dbRequest)
    deleteImage(body.image)
    res.end()
})

router.put('/editcard', async (req, res) => {
    const body = req.body
    const imageDbRequest = req.file?.filename? `, picture = '${req.file.filename}'` : ''
    if (imageDbRequest) {
        const dbRequest = `SELECT picture FROM products WHERE id = '${body.id}';`
        const [data] = await requestToDb(dbRequest)
        deleteImage(data.picture)
    }
    const dbRequest = `UPDATE products SET name = '${body.name}', description = '${body.description}', price = '${body.price}'${imageDbRequest} WHERE id = ${body.id};`
    await requestToDb(dbRequest)
    res.end()
})


//  USERS
router.post('/registration', async (req, res) => {
    const body = req.body
    body.password = shajs('sha224').update(body.password).digest('hex')
    const checkingUserNameDbRequest = `SELECT username FROM users WHERE username = '${body.username}';`
    const checkingEmailDbRequest = `SELECT email FROM users WHERE email = '${body.email}';`
    const dbRequest = `INSERT INTO users (id, username, password, email) VALUES (null, '${body.username}', '${body.password}', '${body.email}');`

    const connection = await mysql.createConnection(dbConfig)
    const [[emails]] = await connection.execute(checkingEmailDbRequest)
    const [[userNames]] = await connection.execute(checkingUserNameDbRequest)
    if (!emails && !userNames) {
        await connection.execute(dbRequest)
        connection.end()
        res.end()
    } else {
        connection.end()
        res.json(userNames || emails)
    }
})

router.post('/login', async (req, res) => {
    const body = req.body
    body.password = shajs('sha224').update(body.password).digest('hex')
    const dbRequest = `SELECT username, password, id FROM users WHERE username = '${body.username}';`
    const connection = await mysql.createConnection(dbConfig)
    const [[match]] = await connection.execute(dbRequest)
    if (match.username === body.username && match.password === body.password) {
        const time = new Date().toString();
        const token = shajs('sha224').update(time).digest('hex')
        const expirationDate = new Date (new Date(time).getTime() + 1000*60*60*2).toString()
        const dbSetTokenRequest = `UPDATE users SET token = '${token}', expirationDate = '${expirationDate}' WHERE username = '${body.username}';`
        await connection.execute(dbSetTokenRequest)
        connection.end()
        res.json({
            token, username: body.username, expirationDate, id: match.id
        })
    } else {
        res.end()
    }

})


module.exports = router
