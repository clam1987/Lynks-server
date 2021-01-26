const db = require("../models");
const { LikedUsers, User } = db;

module.exports = {
    postLikedUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { id: likedUserId } = await LikedUsers.create(req.body);
            const dbUser = await User.findOneAndUpdate({_id: id}, { $push: { likedUsers: likedUserId }}, { new: true });
            res.status(200).json(dbUser);
        } catch(err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
        }
    },
    getLikedUserInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUser = await User.findById(id).populate(['lynksLocation', 'likedUsers']);
            const likedUserId = currentUser.likedUsers.map(user => user.liked && user.accountId);
            const likedUserInfo = await User.find({_id: { $in: likedUserId}});
            const data = {
                ...currentUser._doc,
                likedUsers: likedUserInfo
            };
            res.status(200).json(data);
        } catch(err) {
            console.log(err);
            return res.status(500).json("Internal Server Error");
        }
    }
}