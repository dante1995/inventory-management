# Build a Fullstack Inventory Management Dashboard

[![Tutorial Video](https://img.youtube.com/vi/ddKQ8sZo_v8/0.jpg)](https://www.youtube.com/watch?v=ddKQ8sZo_v8)

Link to related video: https://www.youtube.com/watch?v=ddKQ8sZo_v8

## Tutorial

This repository contains the code corresponding to an in-depth tutorial available on my YouTube channel. It is highly suggested to watch the [tutorial video](https://www.youtube.com/watch?v=ddKQ8sZo_v8) as it includes detailed instructions on how to set up everything, including deploying AWS. This tutorial is designed for both beginners and experts.

Join our [Discord community](https://discord.com/channels/1070200085440376872/1267499814678171698) for discussions about this specific app.

## Tech Stack

- **Next JS**
- **Tailwind**
- **Redux Toolkit**
- **Redux Toolkit Query**
- **Material UI Data Grid**
- **Node.js**
- **Prisma**
- **AWS EC2**
- **AWS RDS**
- **AWS API Gateway**
- **AWS Amplify**
- **AWS S3**

## Resources and Links

### Image Files

- [Server assets to download](https://github.com/ed-roh/inventory-management/tree/master/server/assets)

### Configuration and Code

- [tailwind.config.ts](https://github.com/ed-roh/inventory-management/blob/master/client/tailwind.config.ts) (to copy)
- [Redux store file](https://github.com/ed-roh/inventory-management/blob/master/client/src/app/redux.tsx) (to copy)
- [Seed files for database](https://github.com/ed-roh/inventory-management/blob/master/server/prisma/seed.ts) (to copy)
- [Seed data files](https://github.com/ed-roh/inventory-management/tree/master/server/prisma/seedData) (to download)

### Additional Resources

- [Data model diagram](https://drawsql.app/teams/team-3023/diagrams/56-inventorymanagement)
- [Prisma schema file](https://github.com/ed-roh/inventory-management/blob/master/server/prisma/schema.prisma)
- [AWS commands](https://github.com/ed-roh/inventory-management/blob/master/server/aws-ec2-instructions.md)

### Starting locally

- **Postgres setup**
  - Install pgAdmin
  - Create a server in pgAdmin
  - Create a database in pgAdmin
- **Seed data population**

  - create a .env file within the server directory
  - add DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<dbname>?schema=public"
  - navigate to server directory
  - run the command: npx prisma migrate dev
  - run the command: npm run seed

- **Starting the server**

  - navigate to the server directory
  - run the command: npm install --legacy-peer-deps
  - run the command: npm run dev
  - test the server by running the command: curl localhost:3001/dashboard

- **Starting the client**

  - create a .env.local file
  - Add NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
  - navigate to the client directory
  - run the command: npm install --legacy-peer-deps
  - run the command: npm run dev

- **Creating a new migration file**
- npx prisma migrate dev --create-only
