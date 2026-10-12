# Sophie Bluel, portfolio d'architecte

Front-end dynamique du portfolio d'une architecte d'intérieur, écrit en
JavaScript natif et branché sur une API REST. C'est un projet de la formation
Intégrateur web d'OpenClassrooms.

## Fonctionnalités

- **Une galerie dynamique** : les projets sont récupérés depuis l'API
  (`fetch`), puis affichés dans le DOM.
- **Le filtrage par catégorie** : Tous, Objets, Appartements et Hôtels &
  restaurants. Le filtrage se fait côté client.
- **L'authentification** : un formulaire de connexion valide les champs, puis
  appelle `POST /api/users/login`. Le token est stocké, et la page bascule en
  mode édition.
- **Une modale d'administration accessible** (`aria-modal`, `aria-hidden`) :
  - la suppression d'un projet (`DELETE /api/works/:id`) ;
  - l'ajout d'un projet (`POST /api/works`), avec l'aperçu de l'image, la
    vérification du format et de la taille, le choix de la catégorie et la
    validation du formulaire avant l'envoi.
- **Une mise à jour sans rechargement** : la galerie et la modale se
  rafraîchissent après chaque ajout ou suppression.

## Organisation du code

| Fichier | Rôle |
|---|---|
| `main.js` | Point d'entrée : charge les projets et initialise les modules |
| `triage.js` | Affichage de la galerie et boutons de filtre |
| `login.js` | Connexion, gestion du token, mode édition |
| `modal.js` | Ouverture et fermeture de la modale, suppression de projets |
| `ajoutprojet.js` | Formulaire d'ajout de projet |

Les modules utilisent les ES modules natifs (`import` / `export`), sans
bundler.

## Stack

HTML5 · CSS3 · JavaScript (ES6+, Fetch API, ES modules) · API REST

## Lancer le projet

Le front a besoin du back-end fourni par OpenClassrooms, qui doit tourner sur
`http://localhost:5678`.

1. Lancer le back-end (`npm install`, puis `npm start` dans son dossier).
2. Servir ce dépôt avec un serveur local, par exemple l'extension Live Server de
   VS Code. Les ES modules ne fonctionnent pas en ouvrant directement le fichier
   (`file://`).
3. Ouvrir `index.html`.

## Auteur

Raphaël Bonacina, [portfolio](https://gaby-code42.github.io/portfolio/)
