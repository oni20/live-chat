const express = require("express");
const registrationRouter = express.Router();

registrationRouter.use((_req, _res, next) => {
    console.log('Middleware from registration router and user', _res);
    next();
})

registrationRouter.post('/signup', async (req, res) => {
    try {
        console.log('Signup', req.body);
        //res.status(200).json(JSON.stringify(selectedUser));
    } catch {
        res.sendStatus(404)
    }
});

module.exports = registrationRouter;