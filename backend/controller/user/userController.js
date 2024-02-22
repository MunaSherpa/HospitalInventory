const User = require("../../model/userModel")

module.exports.updateUser = async(req, res)=>{
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success: true, message:"Successfully update", data:updateUser})
    }catch (err){
        res.status(500).json({success: false, message:"Failed to update", })

    }
}
// deleteUser
module.exports.deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id, )
        res.status(200).json({success: true, message:"Successfully deleted", data:updateUser})
    }catch (err){
        res.status(500).json({success: false, message:"Failed to delete", })

    }
}
// getSingleUser
module.exports.getSingleUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id,)
        res.status(200).json({success: true, message:"User Found", data:user})
    }catch (err){
        res.status(404).json({success: false, message:"No user found", })

    }
}
// getAllUser
module.exports.getAllUser = async(req, res)=>{
    const id = req.params.id
    try {
        const users = await User.find({})
        res.status(200).json({success: true, message:"Users Found", data:users})
    }catch (err){
        res.status(404).json({success: false, message:"No user found", })

    }
}