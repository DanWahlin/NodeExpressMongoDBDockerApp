FROM        node:alpine

LABEL       author="Dan Wahlin"
ARG         PACKAGES=nano

ENV         NODE_ENV=production
ENV         PORT=3000
ENV         TERM=xterm

RUN         apk update && apk add --no-cache $PACKAGES

WORKDIR     /var/www

COPY        package*.json ./
RUN         npm ci --only=production && npm cache clean --force

COPY        . ./

EXPOSE      $PORT

ENTRYPOINT  ["npm", "start"]

# Build: docker build -f node.dockerfile -t nodeapp .

# Option 1: Create a custom bridge network and add containers into it

## Create a user-defined bridge network and add containers
# docker network create --driver bridge isolated_network
# docker run -d --network=isolated_network --name mongodb mongo

## NOTE: Use $(pwd) on macOS/Linux, ${PWD} in PowerShell, and %cd% in Windows CMD.
# macOS/Linux
# docker run -d --network=isolated_network --name nodeapp -p 3000:3000 -v "$(pwd)"/logs:/var/www/logs nodeapp

# PowerShell
# docker run -d --network=isolated_network --name nodeapp -p 3000:3000 -v ${PWD}/logs:/var/www/logs nodeapp

# Option 2 (Legacy Linking - this is the OLD way)
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)
 
# docker run -d --name my-mongodb mongo
# docker run -d -p 3000:3000 --link my-mongodb:mongodb --name nodeapp danwahlin/nodeapp
