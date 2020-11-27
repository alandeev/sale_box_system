# System for your company, to control the cash.

## How to install/use ?

- First: git clone https://github.com/alandev2/sale_box_system.git
- second: go to folder in the cmd/shell and type `npm install` or `yarn install`
- third: go to file `.env` and change database config to your `database` or follow commands bellow
- Last type `yarn dev` if you already database configuring.

### How to create database with config of the `.env`

- If you already has `postgres` installed in the your OS `follow bellow`
- First: after following the commands above in the shell `type commands`
### commands to install database pre-configured in the .env

- command ¹ `(yarn or npm) sequelize db:create`
- if command above it's ok `follow bellow`
- command ² `(yarn or npm) sequelize db:migrate`
- if all ok, type `yarn dev` and execute system

## Routers:

### routers authenticate:
- [POST] /auth `{ username, password }`
- [POST] /signup  `{ name, username, password }

### routers user [_need bearer token user_]:
- [GET] /users `list all users`
- [GET] /oauth  `show your information`

### routers clients [_need bearer token user_]:
- [GET] /users/clients `list all clients and address`
- [POST] /users/clients  `{ name, phone }`

### routers address to client [_need bearer token user_]:
- [GET] /users/addresses `list all addresses and owner`
- [POST] /users/addresses  `{ client_id, cep, city, street }`

*I am creating, need others functions and Product Model*
