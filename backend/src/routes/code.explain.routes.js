const express = require("express");
const router = express.Router();

const { explainFunction ,askGemini} = require("../controllers/code.explain.controller");

// This handles POST /api/explain-function
router.post("/explain-function", explainFunction);

// This handles POST /api/ask-gemini
router.post("/ask-gemini", askGemini);

module.exports = router;