const express = require('express');
const {
  getAllPackages,
  getPackageById,
  getPackagesByDelivererId,
  createPackage,
  updatePackageStatus,
  updatePackageDeliverer,
  deletePackageById
} = require('../controllers/packageController');

const router = express.Router();

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.get('/deliverer/:deliverer_id', getPackagesByDelivererId);
router.post('/', createPackage);
router.put('/status/:id', updatePackageStatus);
router.put('/deliverer/:id', updatePackageDeliverer);
router.delete('/:id', deletePackageById);

module.exports = router;
