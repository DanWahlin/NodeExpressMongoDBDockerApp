## Build
# docker build -f node.dockerfile -t nodeapp .

## Create a user-defined bridge network and add containers
# docker network create --driver bridge isolated_network
# docker run -d --network=isolated_network --name mongodb mongo

## NOTE: Use $(pwd) on macOS/Linux, ${PWD} in PowerShell, and %cd% in Windows CMD.
# macOS/Linux
# docker run -d --network=isolated_network --name nodeapp -p 3000:3000 -v "$(pwd)"/logs:/var/www/logs nodeapp

# PowerShell
# docker run -d --network=isolated_network --name nodeapp -p 3000:3000 -v ${PWD}/logs:/var/www/logs nodeapp

# Windows CMD
# docker run -d --network=isolated_network --name nodeapp -p 3000:3000 -v %cd%\logs:/var/www/logs nodeapp

## Seed the database with sample data
# docker exec -it nodeapp node dbSeeder.js

FROM        node:alpine

LABEL       author="Dan Wahlin"

ARG         PACKAGES=nano

ENV         TERM xterm
RUN         apk update && apk add $PACKAGES

WORKDIR     /var/www
COPY        package*.json ./
RUN         npm install
COPY        . ./
RUN         npm run tailwind:css

EXPOSE      3000

ENTRYPOINT  ["npm", "start"]
