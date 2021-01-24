const db = require("../models");
const jwt = require("../configs/jwt");
const { User, LynksAddress } = db;

module.exports = {
    signup: (req, res) => {
        const { email, firstName, lastName, username } = req.body
        try {
            if(!email || !firstName || !lastName || !username) {
                return res.status(400).send("Please fill out all fields");
            }
            User.findOne({$or: [{email}, {username}]}).then(user => {
                if(user === null) {
                    User.create(req.body)
                    return res.status(200).json(user);
                };

                if(email === user.email) {
                    return res.status(400).send("Email already exists. Please use a different email.");
                };

                if (username === user.username) {
                    return res.status(400).send("Username already exists. Please use a different username.");
                };

            })

        } catch (err) {
            return res.status(500).json("Server error, cannot signup");
        }
    },
    submitAddress: (req, res) => {
        LynksAddress.create(req.body)
                    .then(x => {
                        console.log(x.id)
                        const { id } = req.params
                        User.findOneAndUpdate({_id: id}, {$push: { lynksLocation: x.id }}, { new: true })
                            .then(dbUser => res.json(dbUser))
                            .catch(err => res.json(err))
                    });
    },
    login: (req, res) => {
        try {
            const { id } = req.user
            res.status(200).json({ token: jwt.sign({id}), token_type: "Bearer" });
        } catch (err) {
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
            return res.status(500).send(err);
        }
        req.logout();
    },
    getUser: async (req, res) => {
        try {
            const { id } = req.params
            const data = await User.findById(id).populate('lynksLocation')
            res.status(200).json(data)
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getLynksAddress: async (req, res) => {
        try {
            const data = await LynksAddress.find()
            return res.status(200).json(data);
        } catch(err) {
            console.error(err);
            return res.status(500).send("Internal Server Error")
        }
    }
};