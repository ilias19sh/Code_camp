const express = require('express');
const userRouter = require('./routes/users');
const SignalementRouter = require('./routes/dénonciations');
const db = require('./models/db');
const app = express();

app.use(express.json());
app.use('/users' , userRouter);
app.use('/signalement', SignalementRouter);

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