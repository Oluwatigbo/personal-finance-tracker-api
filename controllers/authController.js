const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { USER_COLLECTION } = require('../models/User');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required()
});

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      oauthProvider: 'local'
    };

    // Check for existing email
    const existing = await req.db.collection(USER_COLLECTION).findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    await req.db.collection(USER_COLLECTION).insertOne(user);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// In authController.js, update the login function:
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await req.db.collection(USER_COLLECTION).findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Add 'iat' to make token unique per login
    const token = jwt.sign(
      { id: user._id.toString(), iat: Math.floor(Date.now() / 1000) },  // iat ensures uniqueness
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};