const express = require('express');
const {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getAllBudgets);
router.get('/:id', auth, getBudgetById);
router.post('/', auth, createBudget);
router.put('/:id', auth, updateBudget);
router.delete('/:id', auth, deleteBudget);

module.exports = router;