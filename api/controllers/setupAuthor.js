var Author = require("../models/authorModel")

module.exports = function (app) {
    app.get('/api/setupAuthors', function (req, res) {
        var seedAuthor = [{
                name: 'tuyen',
                age: 99,
                books: [{
                    title: 'the one1',numberOfPages: 100}, 
                    {
                    title: 'the two1',
                    numberOfPages: 100
                }]
            },
            {
                name: 'anh',
                age: 99,
                books: [{
                    title: 'the one2',
                    numberOfPages: 100
                }, {
                    title: 'the two2',
                    numberOfPages: 100
                }]
            }

        ];
        Author.create(seedAuthor, function (err, result) {
            res.send(result);
        });
    });
}