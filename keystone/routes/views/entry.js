var keystone = require('keystone');
var helpers = require('../../templates/views/helpers')()

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'entry';
	locals.filters = {
		entry: req.params.entry,
	};
	locals.data = {
		entries: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Entry').model.findOne({
			state: 'published',
			slug: locals.filters.entry,
		}).populate('author tags');

		q.exec(function (err, result) {
			locals.data.entry = result;
            locals.meta = {
                title: result.title,
                description: result.content.brief,
                url: helpers.fullPostUrl(locals.filters.post),
                image: ""
            }
			next(err);
		});

	});

	// // Load other posts
	// view.on('init', function (next) {
    //
	// 	var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');
    //
	// 	q.exec(function (err, results) {
	// 		locals.data.posts = results;
	// 		next(err);
	// 	});
    //
	// });

	// Render the view
	view.render('post');
};
