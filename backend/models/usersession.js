import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSessionSchema =  new Schema({
    userId: {
        type: String,
        default: ''
      },
      timestamp: {
        type: Date,
        default: Date.now()
      },
      isDeleted: {
        type: Boolean,
        default: false
      } 
});

export default mongoose.model('UserSession', UserSessionSchema);

