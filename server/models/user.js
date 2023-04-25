const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  google_id: { type: String, required: true },
  given_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, lowercase: true },
  picture: { type: String, required: true },
  websites: [
    {
      name: String,
      url: String,
      icon: String,
    },
  ],
  refresh_token: String,
});

UserSchema.virtual('domainName').get(() => {
  return this.websites;
});

module.exports = mongoose.model('User', UserSchema);
