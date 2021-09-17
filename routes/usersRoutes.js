const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// GET All Users
// http://localhost:8000/api/v1/users/
router.get("/", async (req, res) => {
    const userList = await User.find().select("-passwordHash");

    if (!userList) {
        res.status(500).json({ success: false });
    }

    res.send(userList);
});

// GET User By ID
// http://localhost:8000/api/v1/users/:id
router.get("/:id", async (req, res) => {
    // if (!mongoose.isValidObjectId(req.params.id)) {
    //     res.status(400).send("Invalid ID");
    // }

    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
        res.status(500).json({
            success: "The user with the given ID was not found.",
        });
    }

    res.status(200).send(user);
});

// ADD User
// http://localhost:8000/api/v1/users/
router.post("/", async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 05),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();

    if (!user) {
        return res.status(404).send("the user cannot be created!");
    }

    res.send(user);
});

// UPDATE User By ID
// http://localhost:8000/api/v1/users/:id
router.put("/:id", async (req, res) => {
    // if (!mongoose.isValidObjectId(req.params.id)) {
    //     res.status(400).send("Invalid ID");
    // }

    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 05);
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true }
    );

    if (!user) {
        return res.status(404).send("the user cannot be updated!");
    }

    res.send(user);
});

module.exports = router;
