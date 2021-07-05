#!/bin/bash
docker-compose build
docker-compose up -d

sleep 30

docker exec node-1 npx sequelize-cli db:migrate
docker exec node-1 npx sequelize-cli db:seed:all