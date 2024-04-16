const pg = require('pg');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const port=3000;

const pool = new pg.Pool({
    user: 'secadv',
    host: 'db',
    database: 'pxldb',
    password: 'ilovesecurity',
    port: 5432,
    connectionTimeoutMillis: 5000
})

console.log("Connecting...:")

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    // Gebruik parameterized queries om SQL-injectie te voorkomen
    const query = 'SELECT * FROM users WHERE user_name=$1 and password=$2';

    pool.query(query, [username, password], (error, results) => {
        if (error) {
            response.status(500).send('Server error');
            return;
        }
        response.status(200).json(results.rows)
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

