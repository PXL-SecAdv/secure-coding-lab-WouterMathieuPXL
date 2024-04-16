const bcrypt = require('bcrypt');
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

const corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // legacy browser support (IE11, various SmartTVs)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/authenticate/:username/:password', async (request, response) => {
    const username = request.params.username;
    const password = request.params.password;

    const query = 'SELECT * FROM users WHERE user_name=$1';

    pool.query(query, [username], async (error, results) => {
        if (error) {
            response.status(500).send('Server error');
            return;
        }

        if (results.rows.length > 0) {
            const user = results.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                response.status(200).json(user);
            } else {
                response.status(401).send('Authentication failed');
            }
        } else {
            response.status(404).send('User not found');
        }
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

