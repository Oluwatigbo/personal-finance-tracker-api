const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const { USER_COLLECTION } = require('../models/User');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

exports.getAllUsers = async (req, res) => {
  try {
    const users = await req.db.collection(USER_COLLECTION).find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await req.db.collection(USER_COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashedPassword,
      name
    };

    // Check for existing email
    const existing = await req.db.collection(USER_COLLECTION).findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const result = await req.db.collection(USER_COLLECTION).insertOne(user);
    res.status(201).json({ _id: result.insertedId, ...user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updateData = { ...req.body };
    const result = await req.db.collection(USER_COLLECTION).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await req.db.collection(USER_COLLECTION).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};