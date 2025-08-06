1. follow sample.env file and create an actual .env file in server root
2. mkdir server && cd server
3. npm init -y
4. npm install express cors dotenv
5. mkdir src && touch src/index.js
   <!-- 5. npm install pg -->
      <!-- 6. npm install prisma --save-dev -->
      <!-- 7. npm install @prisma/client -->
6. npm install prisma @prisma/client@latest @prisma/extension-accelerate

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
