########################### Fonctionnalités ##############################################################################
* Authentification :
   - Inscription avec génération de JWT
   - Connexion avec mot de passe sécurisé (bcrypt)
   - Middleware de protection des routes avec token

* Gestion des événements :
  - Création, liste et suppression d’événements
  - Filtres par titre, localisation, date et statut
  - Téléchargement d’image via Multer

* Dashboard :
  - Statistiques par statut, par localisation et événements du jour

* Validation :
  - Validation des données avec Zod

* Documentation :
  - Documentation des APIs avec Swagger UI

* Tests :
  - Tests unitaires avec Jest et Supertest

################## Technologies ###################################################################################################"""
Backend : Node.js, Express
Base de données : MongoDB & Mongoose
Validation : Zod
Authentification : JWT
Tests : Jest, Supertest
Documentation : Swagger (OpenAPI 3.0)

################### Installation et Lancement #####################################################################################
git clone https://github.com/oumaAt/events-app-backend.git
cd events-app-backend
npm install

- Créer un fichier .env :

PORT=3000
MONGO_URI=mongodb://localhost:27017/events_db
JWT_SECRET=supersecret

Lancer l’application: 
npm start


##################### API Documentation ###############################################################################
La documentation complète de l'API est disponible via Swagger. Vous pouvez y accéder en utilisant l'URL suivante : http://localhost:3000/api-docs

####################### Tests #####################################################################################
Les tests sont réalisés avec Jest + Supertest.

Lancer les Tests:
npm run test