const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new Schema({
	name : {
		type: String,
		required: true,
		minlength: 5,
		trim: true
	},
	username: {
		type: String,
		required: true,
    unique: true,
		minlength: 5,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	image_url: {
		type: String,
		default: 'N/A'
	},
	is_active: {
		type: Boolean,
		default: false
	}, 
	is_admin: {
		type: Boolean,
		default: false
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
	tokens : [{
    access:{
      type: String,
    },
		token: {
			type: String,
		}
	}]
});

//Methods for UserSchema

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['name', 'username', 'is_active', 'is_admin']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.methods.is_Admin = function () {
  var user = this;
  return this.is_admin;
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (username, password) {
  var User = this;
  return User.findOne({username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;


