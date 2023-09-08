const express = require('express');  
const {handleUsersSignup , handleUsersLogin } = require('../controllers/user')

const router = express.Router();

router.post("/", handleUsersSignup);
router.post("/login", handleUsersLogin);


module.exports = router;
