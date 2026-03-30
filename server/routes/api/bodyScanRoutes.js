const multer = require('multer');
const { createBodyScan } = require('../controllers/bodyScanController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), createBodyScan);

module.exports = router;