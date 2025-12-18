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


## Séquence 3 - Lazy Loading & Composants dynamiques

### Qu'est-ce que le "lazy loading" ?

Le "lazy loading" (chargement paresseux) est une technique qui consiste à ne charger une partie du code de l'application (un module, une page, ou un groupe de composants) que lorsque c'est réellement nécessaire — par exemple quand l'utilisateur visite une route donnée. Cela réduit le poids initial du bundle JavaScript téléchargé au démarrage et améliore le temps de chargement initial de l'application.

### Pourquoi l'utiliser ?

- Démarrage plus rapide : le navigateur télécharge moins de code au premier affichage.
- Meilleure expérience utilisateur sur les connexions lentes ou appareils mobiles.
- Répartition claire du code par fonctionnalité (meilleure maintenabilité).

### Comment c'est implémenté ici ?

Dans ce projet, la route `tasks` est configurée en lazy loading. Concrètement :

- `src/app/app.routes.ts` déclare la route principale :
  - { path: 'tasks', loadChildren: () => import('./features/tasks/tasks-page/route').then(m => m.TASKS_ROUTES) }
  - Cela indique à Angular : "ne charge pas le code des tâches au démarrage, mais importe dynamiquement le fichier de route quand l'utilisateur accède à /tasks".

- `src/app/features/tasks/tasks-page/route.ts` exporte `TASKS_ROUTES` qui contient la définition de la route enfant (par exemple le composant `TasksPage`). Quand Angular charge ce fichier, il récupère également tous les composants et dépendances liés à la fonctionnalité "tasks".

Le résultat : le code lié à la page des tâches n'est pas inclus dans le bundle principal et ne sera téléchargé que si nécessaire.

### Comment structurer une app avec `features/`

La structure avec `features/` est une bonne pratique pour organiser une application Angular de manière modulaire :

- **`features/`** : contient toutes les fonctionnalités métier de l'application (ex: `tasks`, `users`, `dashboard`)
- Chaque feature a ses propres composants, services, et routes
- Les features sont indépendantes et peuvent être lazy-loadées
- **`shared/`** : contient les composants réutilisables (header, footer, boutons, etc.)
- **`core/`** : contient les services globaux et la logique métier partagée

**Exemple dans ce projet :**
```
src/app/
  features/
    tasks/
      tasks-page/   ← feature "tasks" avec son composant et ses routes
  shared/
    header/         ← composant partagé
    footer/         ← composant partagé
  home/
    core/
      services/     ← services globaux
```

Cette organisation permet de :
- Isoler les fonctionnalités
- Faciliter le lazy loading
- Améliorer la maintenabilité
- Faciliter le travail en équipe (chacun peut travailler sur une feature)

### Qu'est-ce qu'un composant dynamique ?

Un composant dynamique est un composant créé et injecté dans le DOM **à la volée** (programmatiquement), au lieu d'être déclaré statiquement dans un template HTML.

**Cas d'usage :**
- Afficher des modals/dialogues à la demande
- Créer des éléments UI conditionnels complexes
- Charger des widgets personnalisés
- Afficher des notifications ou des tooltips

Dans ce projet, `TaskHighlight` est un composant dynamique : il n'est pas présent dans le HTML initial, mais créé dynamiquement quand l'utilisateur clique sur "Mettre en avant".

### Comment fonctionne `ViewContainerRef` + `createComponent()`

**`ViewContainerRef`** est une référence à un "conteneur" dans le DOM où Angular peut injecter dynamiquement des composants.

**Étapes pour créer un composant dynamique :**

1. **Déclarer un conteneur dans le template** :
```html
<div #highlightContainer></div>
```

2. **Récupérer la référence dans le composant** :
```typescript
@ViewChild('highlightContainer', { read: ViewContainerRef }) 
highlightContainer!: ViewContainerRef;
```

3. **Créer le composant dynamiquement** :
```typescript
highlightTask(taskId: number, taskTitle: string) {
  // Vider le container (optionnel)
  this.highlightContainer.clear();
  
  // Créer le composant
  const componentRef = this.highlightContainer.createComponent(TaskHighlight);
  
  // Passer des données au composant
  componentRef.instance.taskId = taskId;
  componentRef.instance.taskTitle = taskTitle;
}
```

**Ce qui se passe en coulisses :**
- `createComponent()` instancie le composant
- Angular l'insère dans le DOM à l'emplacement du `ViewContainerRef`
- On peut accéder à l'instance du composant via `componentRef.instance`
- On peut modifier ses propriétés `@Input()` directement

**Avantages :**
- Contrôle total sur le cycle de vie du composant
- Création conditionnelle et optimisée
- Possibilité de créer plusieurs instances du même composant

### Pièges / bonnes pratiques

- Vérifier que les chemins utilisés dans `import(...)` sont corrects et que les exports (ici `TASKS_ROUTES`) existent.
- Penser à grouper en lazy modules des fonctionnalités indépendantes et lourdes (ex : tableau de bord, administration, éditeur riche) pour maximiser l'impact.
- Toujours appeler `clear()` sur le `ViewContainerRef` avant d'ajouter un nouveau composant pour éviter les duplications.
- Ne pas oublier de déclarer les `@Input()` dans le composant dynamique si vous voulez lui passer des données.

### En résumé

Le lazy loading permet d'optimiser le chargement et l'expérience utilisateur en scindant l'application en morceaux chargés à la demande. Dans ce projet, la route `tasks` est un bon exemple d'implémentation simple : Angular importe dynamiquement le fichier de routes/features quand l'utilisateur demande cette route.

Les composants dynamiques permettent de créer des éléments UI à la volée avec `ViewContainerRef` et `createComponent()`, offrant un contrôle total sur quand et comment les composants sont affichés.

