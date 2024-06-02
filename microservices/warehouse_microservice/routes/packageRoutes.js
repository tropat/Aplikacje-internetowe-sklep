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

router.get('/', authenticateToken, getAllPackages);
router.get('/:id', authenticateToken, getPackageById);
router.get('/deliverer/:deliverer_id', authenticateToken, getPackagesByDelivererId);
router.post('/', authenticateToken, createPackage);
router.put('/status/:id', authenticateToken, updatePackageStatus);
router.put('/deliverer/:id', authenticateToken, updatePackageDeliverer);
router.delete('/:id', authenticateToken, deletePackageById);

module.exports = router;
