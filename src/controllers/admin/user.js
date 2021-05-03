const { body } = require("express-validator");
const User = require("../../models/usermodels");
const jwt = require('jsonwebtoken');
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: "admin all ready registered"
            });
            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString(),
                role: 'admin'
            });

            _user.save((error, data) => {
                if (error) {
                    console.log(error);
                    return res.status(400).json({
                        message: "samething went wrong",
                        error: error,
                    });
                }

                if (data) {
                    return res.status(201).json({
                        message: "admin created successfuly"
                    });
                }

            });


        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') { //verifide the password
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName }
                    });
                } else {
                    return res.status(400).json({
                        message: "invalide password"
                    });
                }
            } else {
                return res.status(400).json({ message: "something went wrong" });
            }
        });
}
