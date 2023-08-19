import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: 3,
    maxLength: 20,
    trim: true
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "last name"
  },
  
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      //npm i validator
      //import validator from 'validator'
      validator: validator.isEmail,
      message: "invalid email !"
    }
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 6
  },
  location: {
    type: String,
    minLength: 6,
    default: "Pakistan , PB"
  }
});

// use function(){} instead of ()=>{}
// becuase you will use this keyword
userSchema.pre("save", async function(next) {
  // this.modifiedPAths => modified props name, email ...
  if (!this.isModified("password")) return;
  // if passowrd does not change don't run this code
  const salts = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salts);
  this.email = this.email.toLocaleLowerCase();
});
// findeOneAndUpdate does not trigger save
// we does not use next() because of wait

// my custom document instance model method
userSchema.methods.createJWT = function() {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d" //`${process.env.LIFETIME}`
  });
};
// compare logged password with password in database
userSchema.methods.comparePassword = async function(userPassword) {
  // be carfull provide password as string not a number
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// hide private data
userSchema.methods.toJSON = function() {
  const user = this;
  const tempUser = user.toObject();
  delete tempUser.password;
  return tempUser;
};

export default mongoose.model("user", userSchema);
