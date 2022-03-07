# Projet-03-lud-autisme

## RUN IT LOCALLY FOR DEV:

1. Create .env at root following .env.example
    `NODE_ENV = dev` : BACK DEV : swagger + local sql (`URL_DEV`)<br>
    `NODE_ENV = front` : FRONT DEV : swagger + remote sql (`URL_DATABASE`)<br>
    `NODE_ENV = production` : swagger diabled + remote sql (`URL_DATABASE`)<br>

    If you only want to run API copy .env in /BACK
2. Terminal : `yarn` (ROOT)
3. Terminal : `yarn dev` => Run react dev mode + API

## RUN IT LOCALLY WITH BUILD :
1. Create .env at root following .env.example
    `NODE_ENV = dev` : BACK DEV : swagger + local sql (`URL_DEV`)<br>
    `NODE_ENV = front` : FRONT DEV : swagger + remote sql (`URL_DATABASE`)

    If you only want to run API copy .env in /BACK
2. Terminal : `yarn` (ROOT)<br>
3. Terminal : `yarn react-build` (ROOT)<br>
4. Terminal : `yarn start` => Build react an run API only who serve built

## HEROKU FREE APP (restricter RAM for build react)
    In Heroku : add a postgresql db in your app
    Add .env.example environment variable in heroku app
    and other env var :  PGSSLMODE disable

Build locally REACT
1. Terminal : `yarn` (ROOT)<br>
2. Terminal : `yarn react-build` (ROOT)<br>
3. Terminal : `heroku login` Login to heroku in your terminal (to get permission acces at your git heroku repos)<br>
3. Terminal : `git add remote heroku https://git.heroku.com/app-name.git` (ROOT)<br>
4. Terminal : `git push heroku ` (ROOT)



## Commandes utiles
`git push <remote> <local branch name>:<remote branch to push into>` push une branche locale sur une remote

## Description du projet

### Syntaxe des commits

> #### Format standard des commits :
>
> type(portée): sujet (description)
>
> Exemple : `git commit -m "build(components): create login component`

> #### Les types

type    |   description |
|--------|--------|
`build` | changement qui affecte le système de build ou des dépendances externes (yarn par exemple ou modifs dans le bundler)
`ci`    | chqngement concernant les fichiers et scripts d'intégration ou de config
`feat`  | ajout d'une nouvelle fonctionnalité
`fix`   | correction d'un bug
`perf`  |amélioration des performances
`refactor`  | lorsque l'on refactorise **sans** apporter de nouvelles fonctionnalités, ni changement de performances
`style` | changement qui affecte **uniquement** le style du code (indentation, mise en forme, ajout d'espace, renommage d'une variable...**pas de logique***)
`docs`  | rédaction ou mise à jour de documentation
`test`  | ajout ou modification de tests
`revert`    | Annulation d'un précédent commit

> #### La portée
> C'est un élément facultatif du commit qui sert à identifier l'élément affecté par le commit. Exemple : controller, route, middleware, component

> #### Le sujet
> **Obligatoire**, il contient une description rapide des changements. Par convention on mettra le sujet au présent, sans majuscule ni point.
> Exemple : add new component
