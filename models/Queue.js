import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
   item: String,
   category: {type: String, default: null},
   completed: Boolean,
   date: { type: Date, default: Date.now },
   author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
 });

 export default mongoose.model('Queue', QueueSchema);