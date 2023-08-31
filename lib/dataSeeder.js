const DockerCommand = require('../models/dockerCommand');

var dataInitializer = function () {

    const initializeData = async (callback) => {

        const runDockerCommand = new DockerCommand({
            command: 'run',
            description: 'Runs a Docker container',
            examples: [
                {
                    example: 'docker run imageName',
                    description: 'Creates a running container from the image. Pulls it from Docker Hub if the image is not local'
                },
                {
                    example: 'docker run -d -p 8080:3000 imageName',
                    description: 'Runs a container in "detached" mode with an external port of 8080 and a container port of 3000.'
                }
            ]
        });

        const psDockerCommand = new DockerCommand({
            command: 'ps',
            description: 'Lists containers',
            examples: [
                {
                    example: 'docker ps',
                    description: 'Lists all running containers'
                },
                {
                    example: 'docker ps -a',
                    description: 'Lists all containers (even if they are not running)'
                }
            ]
        });


        try {
            await runDockerCommand.save();
            await psDockerCommand.save();
            callback();
        } catch (err) {
            callback(err);
        }

    };


    return {
        initializeData: initializeData
    };

}();

module.exports = dataInitializer;