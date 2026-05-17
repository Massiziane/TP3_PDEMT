# TP3 — Docker Compose et architecture multi-services

## Description du projet

Ce projet est une application web simple permettant de gérer une liste d’éléments.

L’application permet de :
- afficher une liste d’éléments
- ajouter un nouvel élément
- stocker les données dans une base MongoDB
- communiquer entre plusieurs services via Docker

Le but principal est de démontrer la mise en place d’une architecture multi-services avec Docker Compose.

---

## Architecture

Le projet est composé de 4 services :

### 1. Client (React + Vite)
- Interface utilisateur
- Permet d’afficher et ajouter des éléments
- Communique avec l’API

### 2. API (Node.js + Express)
- Gère les routes REST
- Connecte l’application à la base de données

### 3. Database (MongoDB)
- Stocke les données de l’application
- Persistance via volume Docker

### 4. Nginx (Reverse proxy)
- Point d’entrée de l’application
- Sert le frontend React
- Redirige les requêtes `/api` vers l’API

---

## Lancement en développement

Pour lancer l’environnement de développement :

```bash
docker compose up --build
```
### Accès :

Frontend : http://localhost:5173
API : http://localhost:5000/api/health

## Lancement en production
Pour lancer l’environnement de production :
```bash
docker compose -f docker-compose.prod.yml up --build
```
### Accès :

Application : http://localhost
API (via nginx) : http://localhost/api/health

## Variables d’environnement
### API
```env
PORT=5000
MONGO_URL=mongodb://database:27017/tp3
```
### Client
```env 
VITE_API_URL=http://localhost:5000/api
```
En production, le client utilise /api via nginx.

## Routes de l’API
### Health check
```
GET /api/health
```
Retour :
```json
{
  "status": "ok",
  "message": "API fonctionnelle"
}
```
### Items
```
GET /api/items
```
Retour : liste des éléments

```
POST /api/items
```
```json
{
  "name": "example"
}
```
## Problèmes rencontrés

Un des principaux problèmes rencontrés était la communication entre les différents services Docker.

Au début, l’API n’était pas accessible depuis le client car les requêtes utilisaient localhost au lieu du nom du service Docker.

Le problème a été résolu en :

- utilisant les noms de services Docker (api, database)
- configurant correctement nginx comme reverse proxy
- séparant les environnements de développement et de production

## Conclusion

Ce projet m’a permis de comprendre comment :

- organiser une architecture multi-services
- utiliser Docker Compose
- connecter un frontend, backend et base de données
- mettre en place un reverse proxy avec nginx