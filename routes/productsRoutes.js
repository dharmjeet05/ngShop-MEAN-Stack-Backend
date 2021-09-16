const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// GET All Products
// http://localhost:8000/api/v1/products/
// router.get("/", async (req, res) => {
//     // const productList = await Product.find()
//     // const productList = await Product.find().select("name image -_id");
//     const productList = await Product.find().populate("category");

//     if (!productList) {
//         res.status(500).json({ success: false });
//     }

//     res.send(productList);
// });

// GET Product By ID
// http://localhost:8000/api/v1/products/:id
router.get("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid ID");
    }

    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
        return res
            .status(500)
            .json({ success: false, message: "Product not found" });
    }

    res.send(product);
});

// ADD Product
// http://localhost:8000/api/v1/products/
router.post("/", async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid category");
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });

    product
        .save()
        .then((product) => {
            return res.status(200).send(product);
        })
        .catch((err) => {
            return res.status(500).send("The product cannot be created");
        });
});

// UPDATE Product By ID
// http://localhost:8000/api/v1/products/:id
router.put("/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send("Invalid ID");
    }

    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send("Invalid category");
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    );

    if (!product) {
        return res.status(404).send("the product cannot be updated!");
    }

    res.send(product);
});

// DELETE Product By ID
// http://localhost:8000/api/v1/products/:id
router.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "the product is deleted",
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "product not found" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

//

// GET Products Count
// http://localhost:8000/api/v1/products/get/count
router.get("/get/count", async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false });
    }

    res.send({ count: productCount });
});

// GET 5 Featured Products
// http://localhost:8000/api/v1/products/get/featured/:count
router.get("/get/featured/:count", async (req, res) => {
    const count = req.params.count ? req.params.count : 0;

    const featuredProducts = await Product.find({ isFeatured: true })
        .populate("category")
        .limit(+count);

    if (!featuredProducts) {
        res.status(500).json({ success: false });
    }

    res.send(featuredProducts);
});

// GET Products By Category
// http://localhost:8000/api/v1/products?categories=323532345,234675687678
router.get("/", async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter).populate("category");

    if (!productList) {
        res.status(500).json({ success: false });
    }

    res.send(productList);
});

module.exports = router;
