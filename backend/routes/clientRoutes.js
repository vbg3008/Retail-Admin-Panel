const express = require('express')
const router = express.Router();
// const requireAuth = require("../middlewares/authMiddleware")

const {getClients , testClients , createClient} = require('../controllers/clientControllers');
const verifiedUser = require('../middlewares/verifiedUser');

router.route('/').get(getClients);
router.route('/test').get(testClients);
router.route('/createClient' , verifiedUser ).post(createClient);
// router.route('/createClient' , requireAuth).post(createClient);

module.exports = router;