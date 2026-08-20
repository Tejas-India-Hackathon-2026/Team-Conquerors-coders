import express from 'express';

const router = express.Router();

const BIHAR_DISTRICTS = [
  { id: "jamui", name: "Jamui (जमुई)", headquarters: "Jamui", drccLocation: "Near ITI, Jamui", cscCount: 180, helpline: "06345-222010" },
  { id: "patna", name: "Patna (पटना)", headquarters: "Patna", drccLocation: "Kankarbagh, Patna", cscCount: 650, helpline: "0612-2219567" },
  { id: "gaya", name: "Gaya (गया)", headquarters: "Gaya", drccLocation: "Gaya Collectorate Campus", cscCount: 420, helpline: "0631-2222500" },
  { id: "muzaffarpur", name: "Muzaffarpur (मुजफ्फरपुर)", headquarters: "Muzaffarpur", drccLocation: "Kachhari Road, Muzaffarpur", cscCount: 490, helpline: "0621-2212101" },
  { id: "bhagalpur", name: "Bhagalpur (भागलपुर)", headquarters: "Bhagalpur", drccLocation: "Sandis Compound, Bhagalpur", cscCount: 380, helpline: "0641-2400001" },
  { id: "darbhanga", name: "Darbhanga (दरभंगा)", headquarters: "Darbhanga", drccLocation: "Laheriasarai, Darbhanga", cscCount: 360, helpline: "06272-245201" },
  { id: "purnia", name: "Purnia (पूर्णिया)", headquarters: "Purnia", drccLocation: "Polytechnic Chowk, Purnia", cscCount: 310, helpline: "06454-242301" },
  { id: "rohtas", name: "Rohtas (रोहतास)", headquarters: "Sasaram", drccLocation: "Near Sasaram Collectorate", cscCount: 290, helpline: "06184-222202" },
  { id: "begusarai", name: "Begusarai (बेगूसराय)", headquarters: "Begusarai", drccLocation: "Harhar Mahadev Chowk", cscCount: 280, helpline: "06243-222835" },
  { id: "nalanda", name: "Nalanda (नालंदा)", headquarters: "Bihar Sharif", drccLocation: "Ranchi Road, Bihar Sharif", cscCount: 320, helpline: "06112-235203" }
];

router.get('/districts', (req, res) => {
  res.json({ success: true, count: BIHAR_DISTRICTS.length, data: BIHAR_DISTRICTS });
});

router.get('/:districtId', (req, res) => {
  const district = BIHAR_DISTRICTS.find(d => d.id === req.params.districtId.toLowerCase());
  if (!district) {
    return res.status(404).json({ success: false, message: 'District not found' });
  }
  res.json({ success: true, data: district });
});

export default router;
