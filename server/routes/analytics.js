import express from 'express';

const router = express.Router();

// Mock store for analytics tracking during hackathon demo
let queryStats = {
  totalVoiceQueries: 1482,
  schemesMatchedCount: 3890,
  topDemandedSchemes: [
    { name: "PM-Kisan Samman Nidhi", count: 520, percent: "35%" },
    { name: "Bihar Mukhyamantri Udyami Yojana", count: 410, percent: "28%" },
    { name: "Ayushman Bharat (PM-JAY)", count: 325, percent: "22%" },
    { name: "Mukhyamantri Kanya Utthan", count: 227, percent: "15%" }
  ],
  districtWiseReach: [
    { district: "Jamui", queries: 430 },
    { district: "Patna", queries: 320 },
    { district: "Gaya", queries: 275 },
    { district: "Muzaffarpur", queries: 240 },
    { district: "Bhagalpur", queries: 217 }
  ]
};

// GET /api/analytics
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: queryStats
  });
});

// POST /api/analytics/log-query
router.post('/log-query', (req, res) => {
  const { transcript, matchedCount, district } = req.body;
  queryStats.totalVoiceQueries += 1;
  queryStats.schemesMatchedCount += (matchedCount || 1);
  res.json({ success: true, message: 'Query logged successfully' });
});

export default router;
