const Book = require('../utils/db').Book;

module.exports = function (app) {
    // 모든 books 조회
    app.get('/api/books', function (req, res) {
        Book.find((err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'database failure' });
            }
            res.json(rows);
        });
    });
    // 특정 books 조회
    app.get('/api/books/:book_id', function (req, res) {
        Book.findOne({ _id: req.params.book_id }, (err, row) => {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (!row) return res.status(404).json({ error: 'book not found' });
            res.json(row);
        });
    });
    // books 추가
    app.post('/api/books', function (req, res) {
        const book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;

        book.save(function (err) {
            if (err) {
                console.error;
                res.json({ result: 0 });
                return;
            }
            res.json({ result: 1 });
        });
    });
    // 특정 book 대체
    app.put('/api/books/:book_id', (req, res) => {
        Book.findById(req.params.book_id, (err, book) => {
            if (err) return res.status(500).json({ error: 'database failure' });
            if (!book) return res.status(404).json({ error: 'book not found' });

            if (req.body.title) book.title = req.body.title;
            if (req.body.author) book.author = req.body.author;
            if (req.body.published_date)
                book.published_date = req.body.published_date;

            book.save((err) => {
                if (err) res.status(500).json({ error: 'failed to update' });
                res.json({ message: 'book updated' });
            });
        });
    });
    app.delete('/api/books/:book_id', (req, res) => {
        Book.remove({ _id: req.params.book_id }, (err) => {
            if (err) return res.status(500).json({ error: 'databse failure' });
            res.status(204).end();
        });
    });
};
