# Node.js with MongoDB and Docker Demo

Application demo designed to show how Node.js and MongoDB can be run in Docker containers. 
The app uses Mongoose to create a simple database that stores Docker commands and examples. 

Interested in learning more about Docker? Visit https://www.pluralsight.com/courses/docker-web-development to view my Docker for Web Developers course.

### Starting the Application with Docker Containers:

1. Install Docker for Windows or Docker for Mac (If you're on Windows 7 install Docker Toolbox: http://docker.com/toolbox).

2. Open a command prompt.

3. Run the commands listed in `node.dockerfile` (see the comments at the top of the file).

4. Navigate to http://localhost:3000. Use http://192.168.99.100:8080 in your browser to view the site if using Docker toolbox. This assumes that's the IP assigned to VirtualBox - change if needed.


### Starting the Application with Docker Compose

1. Install Docker for Windows or Docker for Mac (If you're on Windows 7 install Docker Toolbox: http://docker.com/toolbox).

2. Open a command prompt at the root of the application's folder.

3. Run `docker-compose build`

4. Run `docker-compose up`

5. Run `docker ps -a` and note the ID of the Node container

6. Run `docker exec -it <nodeContainerID> sh` (replace <nodeContainerID> with the proper ID) to sh into the container

7. Run `node dbSeeder.js` to seed the MongoDB database

8. Type `exit` to leave the sh session

9. Navigate to http://localhost:3000 (http://192.168.99.100:3000 if using Docker Toolbox) in your browser to view the site. This assumes that's the IP assigned to VirtualBox - change if needed.

10. Run `docker-compose down` to stop the containers and remove them.

## To run the app with Node.js and MongoDB (without Docker):

1. Install and start MongoDB (https://docs.mongodb.com/manual/administration/install-community/).

2. Install the LTS version of Node.js (http://nodejs.org).

3. Open `config/config.development.json` and adjust the host name to your MongoDB server name (`localhost` normally works if you're running locally). 

4. Run `npm install`.

5. Run `node dbSeeder.js` to get the sample data loaded into MongoDB. Exit the command prompt.

6. Run `npm start` to start the server.

7. Navigate to http://localhost:3000 in your browser.




