import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
    
const exampleSchema = new Schema({
  example: { type: String, required: true },
  description: { type: String, required: true },
});

const dockerCommandSchema = new Schema({
  command: { type: String, required: true },
  description: { type: String, required: true },
  examples: [exampleSchema]
});

const DockerCommandModel = mongoose.model('dockerCommand', dockerCommandSchema);

export default DockerCommandModel;