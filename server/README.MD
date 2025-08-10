1. follow sample.env file and create an actual .env file in server root
2. mkdir server && cd server
3. npm init -y
4. npm install express cors dotenv
5. mkdir src && touch src/index.js

   `npm install prisma --save-dev`

6. `npm install prisma @prisma/client@latest @prisma/extension-accelerate`

either use below command or use prisma console to create a database

7. npx prisma init --db

below is the format of DATABASE_URL that is going to be generated:
`example:- prisma+postgres://accelerate.prisma-data.net/api_key=sample_api_key`
The API key has all the data related to which database to connect etc.

this connection string will only work inside my app. This connection string can not be used to access the database with GUI tools like pgadmin.

8. We can define schema inside schema.prisma file. Use below command to do migration
   `npx prisma migrate dev --name="any_name"`
   This command will create a migration folder inside prisma folder.
   We can go over to prisma console and see the table has been created

   `npx prisma migrate reset` this command will reset the databse clearing all the tables and apply all the saved migrations one after the other

9. To access the databse with a GUI, need to use 'prisma-prosgres-tunnel'
   `npx @prisma/ppg-tunnel` command will create a secure tunnel from our machine to the database. Once you run this command - tunnel is now open
   get the randomly assigned port and connect to the database via your choice of GUI (pgadmin)
   While doing so - remember to disable SSL mode because the tunnel is already secured

10. constraint is added to Ship table where same same cell can not be duplicated by same user
    (X_Y_ownedByPlayerId is unique)

11. put logic related code into a controller folder and used service layer to access databse - MVC style

12. used prisma enum for string type properties in tables

13. TODO - introduce database indexes for columns such as gameId, playerId, X, Y

14. TODO - add a createdAt timestamp property to get the player who sink all the ships (shot count is 10)

15. postman collection - https://sachini-2631862.postman.co/workspace/sachini's-Workspace~9507534c-0775-4ab5-8d4c-f804d0117328/collection/46558865-99fc28e0-1d94-494b-953c-29064a930a5a?action=share&creator=46558865&active-environment=46558865-1fb5f649-0b09-432e-9b61-f62dbb1890e3

Assumptions:

1. first Player is always going to be the machine - bot player
2. X and Y coordinates maximum is 9 and minimum is 0

<h3>Design patterns used: </h3>

1. middleware pattern - to handle error and check session validity (chain of responsibility)
2. Promise pattern - used async/await for sequential waiting and Promise.all for parallel waiting
