# Lud'autisme

## Description du projet

Le projet Lud'autisme a pour but de créer une application web de médiathèque pour l'association Lud'autisme dont vous pouvez trouver les informations [ici](https://www.facebook.com/Ludautisme-344242315626617).

Vous trouverez ci-dessous les informations pour participer dans les meilleures conditions, si vous avez des questions n'hésitez pas à me contacter.

## Les technologies utilisées
### En FRONT
- React
- SASS
- Axios
- Materiel UI

Pour une liste complète voir le package.json [ici](./FRONT/package.json)

### En BACK
- Bcrypt
- Dotenv
- Express
- Json Web Token
- Multer
- Nodemailer
- PostgresSQL
- Sqitch
- Swagger

Pour une liste complète voir le package.json [ici](./BACK/package.json)

### En général
- Commitlint
- Eslint
- Concurrently

## Comment participer
### De quel fonctionnalité / bug puis-je m'occuper ?
C'est simple une liste tenue à jour des développement à réaliser est présente sur ce [trello](https://trello.com/b/2F8MFuGv/ludautisme)<br>
Si jamais une tâche t'intéresse il suffit de te mettre en membres sur cette carte et de la mettre en cours, une fois ton développement terminé et ta pull request ( késako ? On en reparle en dessous :point_down: ) envoyé, tu n'a plus qu'à attendre que ton code soit validé et intégré au projet, dans tous les cas, tu auras un retour. <br>

### Lancer l'application
- Vous pouvez installer la totalité des dépndances en lancant un  `yarn` à la racine du projet.

- Les .env sont a remplir, à la racine, dans le dossier BACK, dans le dossier FRONT

- Le sqitch.conf est a remplir si vous souhaitez utiliser sqitch pour déployer la base de donnée, si vous le préférez je peut vous fournir l'URI d'une base sur héroku.

- Vous pouvez trouver un résumer des scripts de lancement de l'application [ici](./Launch.md)

### Du coté de github
### Fork

Pour récupérer le code, il suffit de faire un fork de ce dépôt, pour ce faire:

- Cliquez sur le bouton "Fork" en haut à droite de cette page, vous pourrez ainsi faire une copie de ce Repo sur votre GitHub
- Clonez votre Repo sur votre machine comme vous en avez l'habitude.

### Ajoutez ce dépôt en remote de votre projet.

```` bash
git remote add upstream git@github.com:kertesz-corentin/Ludautisme.git
````
- Vous pouvez vérifier que ca s'est bien passé comme ceci
````bash
git remote -v
````
- Le résultat devrait ressembler à ceci
````bash
origin    git@github.com:YOUR_USERNAME/YOUR_FORK.git (fetch)
origin    git@github.com:YOUR_USERNAME/YOUR_FORK.git (push)
upstream  git@github.com:kertesz-corentin/Ludautisme.git (fetch)
upstream  git@github.com:kertesz-corentin/Ludautisme.git (push)
````
### Tenir sont fork à jour
Il est fortement conseiller de mettre son fork à jour par rapport au dépôt original, pour ce faire
````bash
git fetch upstream
# Rapatrie toutes les nouvelles modifications provenant du dépôt original
git merge upstream/master
# Fusionne toutes les modifications rapatriées à l'intérieur de vos fichiers de travail
````

Pour plus d'infos sur les fork je vous conseil cet [article](https://www.christopheducamp.com/2013/12/16/forker-un-repo-github/)

### Bien commiter
Ce projet utilise commitlint pour uniformiser le format des commits, commitlint vérifie le format des commit en se basant sur les conventions d'Angular.
Il s'installe directement avec les dépendances, si un commit ne correspond pas aux conventions il vous le refuse, vous trouverez les conventiosn en question [ici](./Commit.md)

### Envoyer mon code
Pour faire remonter votre code nous allons passer par les pull request, l'avantage principale et de pouvoir tester tout code entrant sur le Repo avant de l'intégrer.

Pour savoir comment faire voici un tutoriel [ici](https://yangsu.github.io/pull-request-tutorial/)

Et voilà il n'y à plus qu'à attendre que je passe par la pour tester et intégrer le code.

