import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BlurbsSchema = new Schema({
    category: String,
    name: String,
    content: String,
    date: { type: Date, default: Date.now },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  });

  export default mongoose.model('Blurb', BlurbsSchema);