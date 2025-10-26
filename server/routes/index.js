const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');


router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

router.get('/test-proxy', (req, res) => {
    res.json({ message: 'Proxy working!' });
  });

module.exports = router;