import DockerCommand from '../models/dockerCommand.js';

const getDockerCommands = async () => {
  try {
    const commands = await DockerCommand.find();
    return commands;
  }
  catch (err) {
    return [];
  }
};

export default getDockerCommands;