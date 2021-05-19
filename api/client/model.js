const mongoose = require('mongoose');

/**
 * client Schema
 * @private
 */

const clientSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  phone: { type: String},
  providers: [{
    ref: 'Provider',
    type: mongoose.Schema.Types.ObjectId,
  }],
  status: {
    default: 'active',
    enum: ['active', 'deleted'],
    type: String,
  },
})

const model = mongoose.model('client', clientSchema);

module.exports = model;
