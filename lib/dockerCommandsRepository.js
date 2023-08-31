const DockerCommand = require('../models/dockerCommand');

const getDockerCommands = async () => {
        try {
            const commands = await DockerCommand.find();
            return commands;
        }
        catch (err)
        {
            return [];
        }
};

module.exports = getDockerCommands;