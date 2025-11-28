# TaskBoardPro

Petit projet Angular pour une interface de type tableau de tâches.

## Description
Application Angular simple avec deux pages principales : accueil et à propos. Composants générés via Angular CLI.

## Prérequis
- Node.js (version 24)
- npm (version 11)
- Angular CLI (version 21)

## Installation
1. Cloner le dépôt :
  - `git clone https://github.com/LorisPzt/TaskBoardPro.git`
2. Installer les dépendances :
  - `npm install`
3. Lancer l'application :
  - `npm start`

## Commandes utilisées
- Génération de composants :
  - `ng g c services/header`
  - `ng g c home`
  - `ng g c about`

## Routing
Routes principales disponibles :
- `"/home"` ou `"/"` — page d'accueil
- `"/about"` — page À propos

## Arborescence utile
- `src/app/services/header` — composant header
- `src/app/home` — composant home
- `src/app/about` — composant about
- `src/app/app-routing.module.ts` — configuration des routes

## Auteur
- `LorisPzt` (utilisateur GitHub)


## Séquence 2 - Logique réactive du flux de données

### 1. Structure de flux
- Le service `TaskService` utilise un `BehaviorSubject` pour stocker et émettre la liste des tâches.
- Le composant 'Home' s'abonne à ce flux via 'task$' et le **pipe async** pour afficher les tâches.

### 2. Mise à jour des données

- La méthode 'addTask()' ajout une tâche puis appelle 'next()' pour émettre la nouvelle liste.
- La méthode 'removeTask()' supprime une tâche puis émet la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement

### 3. Points clés retenus

- Pas besoin d'appeler 'getTasks()' à chaque fois : la donnée est 'vivante'.
- '| async' gère l'abonnement et la désinscription automatiquement.
- Le flux reste cohérent entre le service et la vue .
