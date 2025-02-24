const express = require('express');
const {sequelize, Signalement, Preuve} = require('../models/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const signalement = await Signalement.findAll({
            include: [
                { model: Preuve }
            ]
        });
        res.json(signalement);
        console.log('ok');
    } catch (error) {
        console.error('Erreur lors de la récupération des signalements:', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

router.get('/:Id', async (req, res) => {
    try {
        const id = req.params.Id;
        const signalement = await Signalement.findAll({
            where: { id },
            include: [
                { model: Preuve }
            ]
        });
        res.send(signalement);
    } catch (error) {
        console.error('Erreur lors de la récupération du signalement :', error);
        res.status(500).json({ message: "Une erreur s'est produite." });
    }
});

router.post('/', async (req, res) => {
    const { description, categorie, localisation, statut, preuves, id_utilisateur } = req.body;
    try {
        await Signalement.create({
            description, categorie, localisation, statut, preuves, id_utilisateur
        });
        res.status(201).json({ message: `Le signalement a été créé` });
    } catch (error) {
        console.error('Erreur lors de la création du profil :', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création." });
    }
});

module.exports = router;