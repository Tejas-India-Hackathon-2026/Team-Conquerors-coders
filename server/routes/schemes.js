import express from 'express';
import { SCHEMES_DATABASE } from '../data/schemes.js';

const router = express.Router();
const schemesData = SCHEMES_DATABASE;

// GET all schemes (with optional category & search filter)
router.get('/', (req, res) => {
  try {
    const { category, search, level } = req.query;
    let results = [...schemesData];

    if (category && category !== 'all') {
      results = results.filter(s => s.category === category);
    }

    if (level) {
      results = results.filter(s => s.level.toLowerCase().includes(level.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.hindiName.toLowerCase().includes(q) ||
        s.benefit.toLowerCase().includes(q) ||
        s.whoQualifies.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single scheme by ID
router.get('/:id', (req, res) => {
  try {
    const scheme = schemesData.find(s => s.id === req.params.id);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.json({ success: true, data: scheme });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
