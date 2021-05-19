const express = require('express');
const clientRoutes = require('./client/routes');
const providerRoutes = require('./provider/routes');

const router = express.Router();

/**
 * GET /status
 */
router.get('/status', (req, res) => res.send('OK'));


router.use('/client', clientRoutes);
router.use('/provider', providerRoutes);


module.exports = router;
