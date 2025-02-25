const express = require('express');
const userRouter = require('./routes/users');
const SignalementRouter = require('./routes/dénonciations');
const db = require('./models/db');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/api/v1/temoinx/users' , userRouter);
app.use('/api/v1/temoinx/signalement', SignalementRouter);

async function auth() {
    try {
        await db.sequelize.authenticate();
        console.log('Bien connecté');
    } catch (error) {
        console.error('Erreur de connexion :', error);
    }
}
auth();

module.exports = app;