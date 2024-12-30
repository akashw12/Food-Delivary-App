const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://waghakash1409:Chaitrali14@cluster0.zr1nj.mongodb.net/MyFood?retryWrites=true&w=majority&appName=Cluster0';

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Connected to MongoDB");

            try {
                // Fetching food items collection
                const foodCollection = await mongoose.connection.db.collection("food_items");
                const foodData = await foodCollection.find({}).toArray();

                // Fetching food category collection
                const categoryCollection = await mongoose.connection.db.collection("food_Category");
                const categoryData = await categoryCollection.find({}).toArray();

                callback(null, foodData, categoryData);
            } catch (err) {
                console.error("Error fetching collections:", err);
                callback(err, null, null);
            }
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB:", err);
            callback(err, null, null);
        });
};
