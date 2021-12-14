const express  = require("express") 
const router  = express.Router() 
const auth = require("../../middleware/auth")
const UserProfileController  = require("../controllers/user_profile.controller")

router.use(auth)
router.route("/profile", UserProfileController.profile)

module.exports = router ; 
