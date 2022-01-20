# Learning How to GraphQL 📝

## How to GraphQL
[How to GraphQL](https://www.howtographql.com/) is full stack tutorial website


In this example use:
1. [Typescript](https://www.typescriptlang.org/)
2. [Apollo Server](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server) / [Official web site](https://www.apollographql.com/)
3. [Nexus](https://github.com/graphql-nexus/nexus)
4. [Prisma ORM](https://www.prisma.io/)
5. Docker / docker-compose - [PostgreSQL image](https://hub.docker.com/_/postgres)


## How to run project

1. Install `docker` and `docker-compose`
1. Install dependencies NPM dependencies `npm install`
1. Edit file `./docker/docker-compose.yml` and set your custome config and variables
1. Navigate docker folder and run `docker-compose up -d`
1. Run `npx prisma migrate dev --name init`
1. Run `npm run dev`
