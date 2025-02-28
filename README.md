# SpotIt

SpotIt est une application permettant de signaler anonymement des événements et bons plans via une carte interactive. Les utilisateurs peuvent consulter et ajouter des signalements dans différentes catégories (stationnement, WiFi, food, vues panoramiques, etc.)

## Technologies utilisées

- **Frontend :** React.js
- **Backend :** Node.js avec Express
- **Base de données :** PostgreSQL
- **Carte interactive :** Mapbox API

## Fonctionnalités

- **Authentification :** Connexion utilisateur
- **Carte des signalements :** Affichage interactif des signalements sur Mapbox
- **Création de signalements :** Ajout d'un signalement avec description, catégorie, ville et statut
- **Liste des signalements :** Consultation des signalements existants sous forme de liste détaillée
- **Analyses graphiques :** Visualisation des tendances et statistiques des signalements

## Installation et configuration

1. **Cloner le projet**
   ```bash
   git clone https://github.com/ilias19sh/Code_camp.git
   cd Code_camp
   ```

2. **Configurer la base de données PostgreSQL**
   - Créer une base de données `spotit`
   - Ajouter les tables nécessaires (exemple de schéma dans `database/schema.sql`)

3. **Configurer les variables d'environnement**
   - Renommer `.env.example` en `.env`
   - Ajouter les informations suivantes :
     ```env
     DATABASE_URL=postgres://user:password@localhost:5432/spotit
     MAPBOX_API_KEY=ta_cle_api_mapbox
     ```

4. **Lancer le serveur backend**
   ```bash
   cd backend
   nodemon server.js
   ```

5. **Lancer le frontend**
   ```bash
   cd frontend
   npm start
   ```


