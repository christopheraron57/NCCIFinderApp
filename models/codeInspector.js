const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const codeInspectorSchema = new Schema({
  CEO_ID: {
    type: String,
    required: [true, 'CEO_ID is required'], 
    unique: [true, 'This CEO_ID account already exists'] 
  },
  First_Name: {
    type: String, 
    required: [true, 'First name is required'],
    lowercase: true
  },
  Last_Name: {
    type: String, 
    required: [true, 'Last name is required'],
    lowercase: true
  },
  email: { 
    type: String, 
    required: false, 
             unique: [true, 'This email address has been used'] 
            },
  Primary_Email: { 
    type: String, 
    required: false, 
             unique: [true, 'this email address has been used'] 
            },
  password: { 
    type: String, 
    required: false
  },
  Is_Registered: {
    type: Boolean,
    default: false,
    required: false
  },
  certificates: [{
    Cert_No: { type: String },
    Type: { type: String },
    Trade: { type: String },
    Level: { type: String },
    Exp_Date: { type: String },
  }],
  Employer: {
    type: String,
    required: false
  },
  Emp_Phone: {
    type: String,
    required: false
  },
  Employee_Phone: {
    type: String,
    required: false
  },
  County: {
    type: String,
    required: false
  },
  Address: {
    type: String,
    required: false
  },
  City: {
    type: String,
    required: false
  },
  State: {
    type: String,
    required: false
  },
  ZipCode: {
    type: String,
    required: false
  },
  Additional_contact_email: {
    type: String,
    required: false
  },
  Availability_status: {
    type: Boolean,
    required: false,
    default: false
  },
  Out_Of_Office: [{
    startTime: {
      type: String,
      required: false
    },
    endTime: {
      type: String,
      required: false
    }
  }],
  Estimated_Hourly_PayRate: {
    type: Number,
    required: false,
    default: 0.0
  }
}
);






codeInspectorSchema.pre('save', function(next){
  let codeInspector = this;
  if (!codeInspector.isModified('password'))
      return next();
  bcrypt.hash(codeInspector.password, 10)
  .then(hash => {
    codeInspector.password = hash;
    next();
  })
  .catch(err => next(error));
});


codeInspectorSchema.methods.comparePassword = function(inputPassword) {
  let codeInspector = this;
  return bcrypt.compare(inputPassword, codeInspector.password);
}

module.exports = mongoose.model('codeInspector', codeInspectorSchema);