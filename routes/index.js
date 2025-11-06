import express from 'express';
import getDockerCommands from '../lib/dockerCommandsRepository.js';
import DockerCommandModel from '../models/dockerCommand.js';

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const commands = await getDockerCommands();
  res.render('index', { dockerCommands: commands });
});

/* GET new command page */
router.get('/newcommand', (req, res, next) => {
  res.render('newcommand');
});

router.post('/newcommand', async (req, res, next) => {
  // Extremely simple implementation to get a command in the database
  const commandData = {
    command: req.body.command,
    description: req.body.description,
    examples: [{
      example: req.body.example,
      description: req.body.ex_description
    }]
  }
  const command = new DockerCommandModel(commandData);
  try {
    const cmd = await command.save();
    console.log(cmd.command + " saved to commands collection.");
  }
  catch (err) {
    console.log(err);
  }
  res.redirect('/');
});

export default router;
