const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/Auth');


// Auth Routes

router.post('/send_admin_otp', adminController.sendAdminOtp);
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Change Password

router.post('/change_password',authenticateAdmin, adminController.changePassword);

// Forgot_Password

router.post('/forgot_password_send_otp', adminController.forgotPasswordSendOtp);
router.post('/forgot_password_verify_otp', adminController.forgotPasswordVerifyOtp);
router.post('/forgot_password_reset', adminController.forgotPasswordReset);

router.post('/update_status',authenticateAdmin, adminController.updateVendorStatus);
router.post('/get_all_aprrove_vendors',authenticateAdmin, adminController.getAllApprovedVendors);
router.post('/add_farm_category',authenticateAdmin, adminController.addFarmCategory);
router.post('/add_Farm_Facilities',authenticateAdmin, adminController.addFacilities);
router.post('/get_all_bookings', authenticateAdmin,adminController.getAllBookings);
router.post('/get_booking_details',authenticateAdmin, adminController.getBookingByBookingId);
router.post('/get_all_customers',authenticateAdmin, adminController.getAllCustomers);
router.post('/get_all_vendors',authenticateAdmin, adminController.getAllVendors);
router.post('/get_vendor_by_id',authenticateAdmin, adminController.getVendorWithFarms);
router.post('/get_all_farms',authenticateAdmin, adminController.getAllFarms);
router.post('/Change_farm_status',authenticateAdmin, adminController.updateFarmStatus);

// Profile_apis

router.post('/profile',authenticateAdmin, adminController.getAdminProfile);
router.post('/update_profile',authenticateAdmin, adminController.updateAdminProfile);

module.exports = router;
    