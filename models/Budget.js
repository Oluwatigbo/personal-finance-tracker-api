const BUDGET_COLLECTION = 'budgets';

const budgetStructure = {
  userId: 'ObjectId',
  categoryId: 'ObjectId',
  amount: 'number',
  month: 'number',
  year: 'number',
  createdAt: 'date'
};

module.exports = { BUDGET_COLLECTION, budgetStructure };