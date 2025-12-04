const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { TRANSACTION_COLLECTION } = require('../models/Transaction');

const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().required(),
  categoryId: Joi.string().optional(),
  date: Joi.date().required(),
  type: Joi.string().valid('income', 'expense').required(),
  tags: Joi.array().items(Joi.string()).optional(),
  notes: Joi.string().optional()
});

const transactionUpdateSchema = Joi.object({
  amount: Joi.number().positive().optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  date: Joi.date().optional(),
  type: Joi.string().valid('income', 'expense').optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  notes: Joi.string().optional()
}).min(1);

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await req.db.collection(TRANSACTION_COLLECTION).find({ userId: new ObjectId(req.user.id) }).toArray();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await req.db.collection(TRANSACTION_COLLECTION).findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTransaction = async (req, res) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const transaction = {
      ...req.body,
      userId: new ObjectId(req.user.id),
      categoryId: req.body.categoryId ? new ObjectId(req.body.categoryId) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await req.db.collection(TRANSACTION_COLLECTION).insertOne(transaction);
    res.status(201).json({ _id: result.insertedId, ...transaction });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { error } = transactionUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updateData = {
      ...req.body,
      categoryId: req.body.categoryId ? new ObjectId(req.body.categoryId) : undefined,
      updatedAt: new Date()
    };
    const result = await req.db.collection(TRANSACTION_COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id), userId: new ObjectId(req.user.id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const result = await req.db.collection(TRANSACTION_COLLECTION).deleteOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};