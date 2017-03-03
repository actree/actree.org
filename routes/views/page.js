var keystone = require('keystone');
var helpers = require('../../templates/views/helpers')()

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page';
	locals.filters = {
		page: req.params.page,
	};
	locals.data = {
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Page').model.findOne({
			slug: locals.filters.page,
		});

		q.exec(function (err, result) {
			locals.data.page = result;
            locals.meta = {
                // title: result.title,
                // description: result.content.brief,
                // url: helpers.fullPostUrl(locals.filters.post),
                // image: ""
            }
			next(err);
		});

	});

	// Render the view
	view.render('page');
};
