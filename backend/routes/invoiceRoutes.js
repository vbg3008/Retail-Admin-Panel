const express = require('express')
const router = express.Router();

const {getInvoices , testInvoicess , createInvoice} = require('../controllers/invoiceController');
const verifiedUser = require('../middlewares/verifiedUser');

router.route('/').get(getInvoices);
router.route('/createInvoice' , verifiedUser).post(createInvoice);
router.route('/test').get(testInvoicess);

module.exports = router;