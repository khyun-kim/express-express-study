const mongoose = require('mongoose');

const On = () => {
    const db = mongoose.connection;
    const db_url = process.env.DB_URL || `url`;
    db.on('error', console.error);
    db.once('open', () => {
        console.log('Connected to mongodb server');
    });
    mongoose
        .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(console.error);
};

// [DEFINE MODEL]
const Book = require('./models/books');

module.exports = {
    On,
    Book,
};
