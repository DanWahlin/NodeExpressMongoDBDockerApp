# Build: docker build -f node.dockerfile -t danwahlin/node .

# Option 1: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d --net=isolated_network --name nodeapp -p 3000:3000 danwahlin/node

# Seed the database with sample database
# Run: docker exec nodeapp node dbSeeder.js

# Option 2 (Legacy Linking)
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)
 
# docker run -d --name my-mongodb mongo
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name nodeapp danwahlin/node

FROM        node:alpine

LABEL       author="Dan Wahlin"

ENV         NODE_ENV=production
ENV         PORT=3000

WORKDIR     /var/www
COPY        package.json package-lock.json ./
RUN         npm install

COPY        . ./
EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]