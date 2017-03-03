var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'entries';
    locals.title = "Einträge";
	locals.filters = {
		tag: req.params.tag,
	};
	locals.data = {
		entries: [],
		tags: [],
        activeTag: req.params.tag
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('Tag').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.tags = results;

			// Load the counts for each category
			async.each(locals.data.tags, function (tag, next) {

				keystone.list('Entry').model.count().where('tags').in([tag.id]).exec(function (err, count) {
					tag.entryCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.tag) {
			keystone.list('Tag').model.findOne({ slug: locals.filters.tag }).exec(function (err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
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

		if (locals.data.tag) {
			q.where('tags').in([locals.data.tag]);
		}

		q.exec(function (err, results) {
			locals.data.entries = results;
			next(err);
		});
	});

	// Render the view
	view.render('entries');
};
