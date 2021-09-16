const Category = require("../models/categoryModel");
const express = require("express");
const router = express.Router();

// GET All Categories
// http://localhost:8000/api/v1/categories/
router.get("/", async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }

    res.status(200).send(categoryList);
});

// GET Category By ID
// http://localhost:8000/api/v1/categories/:id
router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid ID");
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({
            success: "The category with the given ID was not found.",
        });
    }

    res.status(200).send(category);
});

// ADD Category
// http://localhost:8000/api/v1/categories/
router.post("/", async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });

    category = await category.save();

    if (!category) {
        return res.status(404).send("the category cannot be created!");
    }

    res.send(category);
});

// UPDATE Category By ID
// http://localhost:8000/api/v1/categories/:id
router.put("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid ID");
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true }
    );

    if (!category) {
        return res.status(404).send("the category cannot be updated!");
    }

    res.send(category);
});

// DELETE Category By ID
// http://localhost:8000/api/v1/categories/:id
router.delete("/:id", (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    success: true,
                    message: "the category is deleted",
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "category not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

module.exports = router;
