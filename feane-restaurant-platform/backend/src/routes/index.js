// File: backend/src/routes/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
const menuRoutes = require('./menu.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);

module.exports = router;