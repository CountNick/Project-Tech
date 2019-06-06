var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
  
    id: String,

    name: String,
            
    age: Number,

    bio: String,

    artists: Array,

    img: String
  });

  // eslint-disable-next-line no-unused-vars
  var User = module.exports = mongoose.model('User', userSchema);