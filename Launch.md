
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