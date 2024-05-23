const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');



require('../database/conn');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');
// const Salevehicle = require('../models/salevehicleSchema');
// const Cart = require('../models/cartSchema');
// const Rentvehicle = require('../models/rentvehicleSchema');
// const Rentcart = require('../models/rentcartSchema');
// const Salevehicleincomes = require('../models/saleVehicleIncomeSchema');
// const Rentvehicleincomes = require('../models/rentVehicleIncomeSchema');
// const Salevehiclereviews = require('../models/vehiclereviewSchema');
// const Rentvehiclereviews = require('../models/rentvehiclereviewSchema');




router.get('/', (req, res) =>{
    res.send('home page router')
});


// Client Side Modules ---for-- SignIn, SignUp, SignOut, Contactform
router.use(require('../clientSideModules/signup'))
router.use(require('../clientSideModules/signin'))
router.use(require('../clientSideModules/signout'))
router.use(require('../clientSidemodules/getdata'))
router.use(require('../clientSideModules/contactform'))

// Client Side Modules ---for-- Sale vehicles
router.use(require('../clientSideModules/displayallsalevehicles'))
router.use(require('../clientSideModules/exploreallsalevehicles'))
router.use(require('../clientSideModules/salevehiclesearch'))
router.use(require('../clientSideModules/reviewsforsalevehicles'))

// Client Side Modules ---for-- Rent vehicles
router.use(require('../clientSidemodules/displayallrentvehicles'))
router.use(require('../clientSidemodules/doublebooking'))
router.use(require('../clientSideModules/exploreallrentvehicles'))
router.use(require('../clientSideModules/rentvehicleserch'))
router.use(require('../clientSideModules/reviewsforrentvehicles'))
router.use(require('../clientSidemodules/addtocartforrentvehicles'))
router.use(require('../clientSidemodules/displayrentcartdata'))
router.use(require('../clientSidemodules/paymentmethoderentvehicles'))
router.use(require('../clientSidemodules/updatedbafetrrentedvehicle'))



// Admin Side Modules---for--- SignIn, SignOut
router.use(require('../adminSidemodules/signinadmin'))
router.use(require('../adminSideModules/siginoutadmin'))
router.use(require('../adminSideModules/getadmindata'))

// Admin Side Modules---for--- Sale vehicles
router.use(require('../adminSideModules/addsalevehicles'))
router.use(require('../adminSideModules/getallsalevehicles'))
router.use(require('../adminSideModules/deletesalevehicles'))
router.use(require('../adminSideModules/incomeforsalevehicles'))

// Admin Side Modules---for--- Rent vehicles
router.use(require('../adminSideModules/addrentvehicles'))
router.use(require('../adminSideModules/getallrentvehicles'))
router.use(require('../adminSidemodules/rentedinformation'));
router.use(require('../adminSideModules/incomeforrentvehicles'))

// Admin Side Modules---for--- Users
router.use(require('../adminSideModules/deleteuser'))
router.use(require('../adminSideModules/getallusers'))
router.use(require('../adminSideModules/deletemessage'))








module.exports = router;