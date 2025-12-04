const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { CATEGORY_COLLECTION } = require('../models/Category');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  color: Joi.string().optional()
});

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await req.db.collection(CATEGORY_COLLECTION).find({ userId: new ObjectId(req.user.id) }).toArray();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await req.db.collection(CATEGORY_COLLECTION).findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCategory = async (req, res) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const category = { ...req.body, userId: new ObjectId(req.user.id), createdAt: new Date() };
    const result = await req.db.collection(CATEGORY_COLLECTION).insertOne(category);
    res.status(201).json({ _id: result.insertedId, ...category });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCategory = async (req, res) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const result = await req.db.collection(CATEGORY_COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id), userId: new ObjectId(req.user.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await req.db.collection(CATEGORY_COLLECTION).deleteOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user.id)
    });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};