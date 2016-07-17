var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

    locals.data = {
		posts: [],
        entries: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

        var q = keystone.list('Post').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
            filters: {
                state: 'published',
            },
        })
            .sort('-publishedDate')
            .populate('author category');

        // if (locals.data.category) {
        //     q.where('categories').in([locals.data.category]);
        // }

        q.exec(function (err, results) {
            locals.data.posts = results;
            next(err);
        });
    });

    view.on('init', function (next) {

        var q = keystone.list('Entry').paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10,
            filters: {
                state: 'published',
            },
        })
            .sort('-publishedDate')
            .populate('author tags');

        // if (locals.data.category) {
        //     q.where('categories').in([locals.data.category]);
        // }

        q.exec(function (err, results) {
            locals.data.entries = results;
            next(err);
        });
    });

	// Render the view
	view.render('index');
};
