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