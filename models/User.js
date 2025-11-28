// No Mongoose schema; define collection name and basic structure for reference
const USER_COLLECTION = 'users';

// Example structure (for documentation; validation handled in controllers)
const userStructure = {
  email: 'string',  // Unique
  password: 'string',  // Hashed
  name: 'string'
};

module.exports = { USER_COLLECTION, userStructure };