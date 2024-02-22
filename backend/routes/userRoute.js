const {updateUser, deleteUser, getAllUser, getSingleUser} = require("../controller/user/userController.js")

const router = require("express").Router()


//routes here

router.get('/:id', getSingleUser)
router.get('/', getAllUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)




module.exports = router