const express = require('express');
const router = express.Router();
const mongoDB = require("../db");

// Route to fetch food items and categories
router.post('/foodData', (req, res) => {
    mongoDB((err, foodData, categoryData) => {
        if (err) {
            // Return error message in the response
            return res.status(500).json({
                error: "Error fetching data from MongoDB",
                details: err
            });
        }

        // Log data to the response for Thunder Client's console
        res.status(200).json({
            message: "Food and Category Data fetched successfully",
            food_items: foodData,  // The food items data
            food_categories: categoryData  // The category data
        });
    });
});

module.exports = router;
