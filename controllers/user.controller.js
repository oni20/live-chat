const UserModel = require('../models/newUser.model');
const { signInErrors } = require('../utils/errors.utils');

module.exports.createUser = async (req, res) => {
    let user = await UserModel.findOne({
        email: req.body.email
    });

    if (user) {
        res.status(404).json({ error: 'User already exists' });
    } else {
        try {
            user = new UserModel(req.body);
            user = await user.save();
            res.status(201).json(user)            
        } catch (err) {
            return res.status(400).JSON({ err });
        }
    }
}

module.exports.authenticateUser = async (req, res) => {
    console.log('Login', req.body);
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        res.status(200).json(JSON.stringify({ user: user._id }))
    } catch (err) {
        console.log('Invalid user ID', err);
        const errors = signInErrors(err);
        res.status(400).json({ errors });
    }
}