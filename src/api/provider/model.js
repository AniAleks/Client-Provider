const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
});

const model = mongoose.model('provider', providerSchema);

module.exports = model;
