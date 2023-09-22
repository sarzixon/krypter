# Project Setup

## Build && run postgress container
1. create schema __krypter__
2. create database __krypter__
3. run migrations && seed database => __npx prisma migrate reset__
4. check .env file DATABASE_URL - DATABASE_URL="postgresql://postgres:password@0.0.0.0:5432/krypter?schema=krypter"
    if you run all project containers use postgres container name instead 0.0.0.0
   DATABASE_URL="postgresql://postgres:password@0.0.0.0:5432/krypter?schema=krypter"

## Nginx con.d file for Docker production container

The nginx configuration should always redirect to index.html regardless the URL so React app can handle routing.
Config file path on docker container: __/etc/nginx/conf.d/default.conf__