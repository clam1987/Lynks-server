const db = require("../models");
const jwt = require("../configs/jwt");
const { LynksAddress, TestUser } = require("../models");
const { User } = db;

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const data = await User.find().populate(['lynksLocation', 'likedUsers']);
            res.status(200).json(data)
        } catch(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    },
    getAllUsersInLocation: async ({ params }, res) => {
        try {
            const { locationId } = params;
            const data = await LynksAddress.findById(locationId).populate("users");
            res.status(200).send(data); 
        } catch(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await User.findById(id).populate(['lynksLocation', 'likedUsers']);
            res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },
    signup: (req, res) => {
        const { email, firstName, lastName, username } = req.body;
        try {
            if(!email || !firstName || !lastName || !username) {
                return res.status(400).send("Please fill out all fields");
            }
            User.findOne({$or: [{email}, {username}]}).then(user => {
                if(user === null) {
                    User.create(req.body)
                    return res.status(200).json("User Created!");
                };

                if(email === user.email) {
                    return res.status(400).send("Email already exists. Please use a different email.");
                };

                if (username === user.username) {
                    return res.status(400).send("Username already exists. Please use a different username.");
                };

            })

        } catch (err) {
            console.error(err);
            return res.status(500).json("Server error, cannot signup");
        }
    },
    login: (req, res) => {
        try {
            const { id } = req.user
            res.status(200).json({ token: jwt.sign({id}), token_type: "Bearer" });
        } catch (err) {
            console.error(err);
            return res.status(500).send("Server error, cannot login");
        }
    },
    logout: (req, res) => {
        try {
            if(req.user) {
                req.session.destroy(err => {
                    if (err) throw err;
                    res.send({ message: "User logged out" });
                });
                // req.logout();
            } else {
                res.send({ message: "no user to logout" });
            };
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        req.logout();
    },
    updateMatch: async (req, res) => {
        try {
            const { id } = req.params;
            const { matchUserId } = req.body
            const data = await User.findOneAndUpdate({ _id: id }, { $push: { matchUsers: matchUserId } }, { new: true })
            res.status(200).json(data)
        } catch(err) {
            console.error(err);
        }
    },
    createTestUser: async (req, res) => {
        try {
            const { email, firstName, lastName, username } = req.body;
            try {
                if(!email || !firstName || !lastName || !username) {
                    return res.status(400).send("Please fill out all fields");
                }
                const user = await TestUser.findOne({$or: [{email}, {username}]})
                    if(user === null) {
                        TestUser.create(req.body)
                        return res.status(200).json(req.body);
                    };
    
                    if(email === user.email) {
                        return res.status(400).send("Email already exists. Please use a different email.");
                    };
    
                    if (username === user.username) {
                        return res.status(400).send("Username already exists. Please use a different username.");
                    };
    
             
    
            } catch (err) {
                console.error(err);
                return res.status(500).json("Server error, cannot signup");
            }
        } catch(err) {
           console.error(err)
        }
    },
    getTestUser: async (req, res) => {
        try {
            const data = await TestUser.find().populate(['lynksLocation', 'likedUsers']);
            res.status(200).json(data)
        } catch(err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    }
};