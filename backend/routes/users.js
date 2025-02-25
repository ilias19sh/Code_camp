const express = require('express');
const {sequelize, Utilisateur}   = require('../models/db');
const router = express.Router()



router.get('/', async (req, res) => {
    try {
        const users = await Utilisateur.findAll(); // Récupérer tous les utilisateurs
        res.json(users);
        console.log('ok');
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error); // Correction de la fonction console.error
        res.status(500).send('Erreur interne du serveur'); // Envoi d'un message d'erreur approprié
    }
});

router.get('/:Id' ,async (req, res) =>{

    try{
        const id = req.params.Id
        const user = await Utilisateur.findAll({where : {id}});
    res.send(user)
    } catch (error) {
        console.error('Erreur lors de la récupération de l utilisateurs :', error);
        res.status(500).json({ message: "Une erreur s'est produite." });
    }
})

router.post('/', async (req, res) => {
    const { pseudo, email, mot_de_passe } = req.body;
    const transaction = await sequelize.transaction();
    const existingUser = await Utilisateur.findOne({ where: { email } }); // Vérification par email au lieu de id
    if (existingUser) {
        return res.status(400).json({ message: `L'utilisateur avec l'email '${email}' existe déjà` }); // Correction du message
    }
    try {
        await Utilisateur.create({
            pseudo, email, mot_de_passe
        }, { transaction });
        await transaction.commit();
        res.status(201).json({ message: `Le profil de ${pseudo} a été créé` });
    } catch (error) {
        await transaction.rollback();
        console.error('Erreur lors de la création du profil :', error); // Suppression de la transaction rollback car non définie
        res.status(500).json({ message: "Une erreur s'est produite lors de la création." });
    }
});

router.put('/:id', async (req, res) => {
    const { pseudo, email, mot_de_passe, id_ami } = req.body;
    const id = req.params.id;

    // Vérification des champs requis
    if (!pseudo || !email || !mot_de_passe) {
        return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    try {
        // Récupérer l'utilisateur existant
        const user = await Utilisateur.findByPk(id);
        if (!user) {
            return res.status(404).send(`Utilisateur non trouvé.`);
        }

        // Incrémenter la liste des amis
        user.id_ami = [...user.id_ami, id_ami]; // Ajout de l'id_ami à la liste existante
        await user.save(); // Sauvegarder les modifications

        // Mettre à jour les autres informations
        const [updatedUser] = await Utilisateur.update(
            { pseudo, email, mot_de_passe },
            { where: { id } }
        );

        return res.status(200).send(`L'utilisateur ${pseudo} a été mis à jour avec les nouvelles informations.`);
        
    } catch (error) {
        console.error('Erreur lors de la modification du user:', error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la modification." });
    }
});

module.exports = router;