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

        var q = keystone.list('Post').model.find()
            .where('state', 'published')
            .populate('category')
            .sort('-publishedDate')
            .limit(5)
            ;

        q.exec(function (err, posts) {
            locals.data.posts = posts;
            next(err);
        });
    });

    view.on('init', function (next) {

        var q = keystone.list('Entry').model.find()
            .where('state', 'published')
            // .populate('tags')
            .populate({
                path: 'tags',
                // TODO: only show the 3 most popular ones?
                // match: { age: { $gte: 21 }},
                options: { limit: 3 }
            })
            .sort('-publishedDate')
            .limit(10)
            ;

        q.exec(function (err, entries) {
            locals.data.entries = entries;
            next(err);
        });
    });

	// Render the view
	view.render('index');
};
