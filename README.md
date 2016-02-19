# Node.js with MongoDB and Docker Demo

Application demo designed to show how Node.js and MongoDB can be run in Docker containers. 
The app uses Mongoose to create a simple database that stores Docker commands and examples.

##To run the app with Docker Containers:

###Option 1: Use Docker Compose

1. Install Docker Toolbox (http://docker.com/toolbox).

2. Open the `Docker QuickStart Terminal`. After VirtualBox starts in the terminal navigate to the app's folder.

3. Run `docker-compose build`

4. Run `docker-compose up`

4. Navigate to http://192.168.99.100:3000 in your browser to view the site. This assumes that's the IP assigned to VirtualBox - change if needed.


###Option 2: Manually run Docker commands

1. Install Docker Toolbox (http://docker.com/toolbox).

2. Open the `Docker QuickStart Terminal`. After VirtualBox starts in the terminal navigate to the app's folder.

3. Run the commands listed in `node.dockerfile` (see the comments at the top of the file) in the `Docker QuickStart Terminal`.

4. Navigate to http://192.168.99.100:3000 in your browser to view the site. This assumes that's the IP assigned to VirtualBox - change if needed.


##To run the app with Node.js and MongoDB (without Docker):

1. Install and start MongoDB (https://docs.mongodb.org/manual/installation).

2. Install Node.js (http://nodejs.org).

3. Open `config/config.development.json` and adjust the host name to your MongoDB server name (`localhost` normally works if you're running locally). 

4. Run `npm install`.

5. Run `node dbSeeder.js` to get the sample data loaded into MongoDB. Exit the command prompt.

6. Run `node server.js` to start the server.

7. Navigate to http://localhost:3000 in your browser.




