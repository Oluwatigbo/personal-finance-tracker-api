const CATEGORY_COLLECTION = 'categories';

const categoryStructure = {
  userId: 'ObjectId',
  name: 'string',
  description: 'string',
  color: 'string',
  createdAt: 'date'
};

module.exports = { CATEGORY_COLLECTION, categoryStructure };