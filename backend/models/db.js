const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('TémoinX', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false,
    }
});

// Table des utilisateurs
const Utilisateur = sequelize.define('Utilisateur', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    pseudo: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    date_inscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    amis: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true },  // Liste d'IDs d'amis
}, {
    tableName: 'utilisateur',
});

// Table des signalements
const Signalement = sequelize.define('Signalement', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    categorie: { type: DataTypes.STRING, allowNull: false },
    localisation: { type: DataTypes.STRING, allowNull: true },
    statut: { 
        type: DataTypes.ENUM('en attente', 'examiné', 'résolu'), 
        defaultValue: 'en attente', 
        allowNull: false 
    },
    date_creation: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
    preuves: { type: DataTypes.JSONB, allowNull: true },
    id_utilisateur: { 
        type: DataTypes.INTEGER, 
        references: {
            model: Utilisateur,
            key: 'id'
        },
        allowNull: false 
    },
}, {
    tableName: 'signalement',
});

// Table des preuves
const Preuve = sequelize.define('Preuve', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    type: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    commentaire: { type: DataTypes.TEXT, allowNull: true },
    id_signalement: { 
        type: DataTypes.INTEGER, 
        references: {
            model: Signalement,
            key: 'id'
        },
        allowNull: false 
    },
}, {
    tableName: 'preuve',
});

// Associations
Utilisateur.hasMany(Signalement, { foreignKey: 'id_utilisateur' });
Signalement.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

Signalement.hasMany(Preuve, { foreignKey: 'id_signalement' });
Preuve.belongsTo(Signalement, { foreignKey: 'id_signalement' });


module.exports = { sequelize, Utilisateur, Signalement, Preuve };
