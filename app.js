require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');


const controllers = require('./controllers');
app.use(require('./middleware/headers'));
app.use(cors());


app.use(require('./middleware/headers'));

app.use(express.json());
app.use('/user', controllers.usercontroller);
app.use('/upload', controllers.uploadcontroller);
app.use('/notes', controllers.notescontroller);


db.authenticate()
        .then(() => db.sync()) // => {force: true}
        .then(() => {
            app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
        })
        .catch((err) => {
            console.log("[Server: ] Server Crashed");
            console.error(err);
        });





