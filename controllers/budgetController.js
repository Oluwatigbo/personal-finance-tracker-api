const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { BUDGET_COLLECTION } = require('../models/Budget');

const budgetSchema = Joi.object({
  categoryId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  month: Joi.number().min(1).max(12).required(),
  year: Joi.number().min(2020).required()
});

exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await req.db.collection(BUDGET_COLLECTION).find({ userId: new ObjectId(req.user.id) }).toArray();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBudgetById = async (req, res) => {
  try {
    const budget = await req.db.collection(BUDGET_COLLECTION).findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBudget = async (req, res) => {
  const { error } = budgetSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const budget = {
      ...req.body,
      userId: new ObjectId(req.user.id),
      categoryId: new ObjectId(req.body.categoryId),
      createdAt: new Date()
    };
    const result = await req.db.collection(BUDGET_COLLECTION).insertOne(budget);
    res.status(201).json({ _id: result.insertedId, ...budget });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBudget = async (req, res) => {
  const { error } = budgetSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updateData = { ...req.body, categoryId: new ObjectId(req.body.categoryId) };
    const result = await req.db.collection(BUDGET_COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id), userId: new ObjectId(req.user.id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Budget not found' });
    res.json({ message: 'Budget updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const result = await req.db.collection(BUDGET_COLLECTION).deleteOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Budget not found' });
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};