// No Mongoose schema; define collection name and basic structure for reference
const TRANSACTION_COLLECTION = 'transactions';

// Example structure (for documentation; validation handled in controllers)
const transactionStructure = {
  userId: 'ObjectId',  // Reference to users collection
  amount: 'number',
  description: 'string',
  categoryId: 'ObjectId',  // Optional reference
  date: 'date',
  type: 'string',  // 'income' or 'expense'
  tags: 'array',  // Array of strings
  notes: 'string',
  createdAt: 'date',
  updatedAt: 'date'
};

module.exports = { TRANSACTION_COLLECTION, transactionStructure };