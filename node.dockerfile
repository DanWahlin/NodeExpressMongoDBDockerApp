# Build: docker build -f node.dockerfile -t danwahlin/node .

# Start MongoDB
# docker run -d --name my-mongodb mongo

# Start Node and Link to MongoDB container
# Run:  docker run -d -p 3000:3000 --link my-mongodb:mongodb --name nodeapp danwahlin/node

# Seed the database with sample database
# Run: docker exec nodeapp node dbSeeder.js

FROM node:latest

MAINTAINER Dan Wahlin

ENV NODE_ENV=development 
ENV PORT=3000

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]