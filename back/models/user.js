var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  userId: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    required: true,
    unique: true

  },
  email: {
    type: String,
    required: true,
    unique: true

  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  last_seen: {
    type: Date,
    default: Date.now()
  },
  token: {
    type: String,
    required: false,
    default: null
  }
})

module.exports = mongoose.model('user', UserSchema)
