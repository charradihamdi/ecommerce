const User = require("../models/usermodels");
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {

            if (user) return res.status(400).json({
                message: "use all ready registered"
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
                username: Math.random().toString()
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
                        user: data
                    });
                }

            });


        });
}