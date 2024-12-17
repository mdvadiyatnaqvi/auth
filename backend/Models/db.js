const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connected!");
    })
    .catch((e) => {
        console.error("MongoDB Error: ", e);
        process.exit(1);
    });