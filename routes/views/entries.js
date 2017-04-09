const keystone = require('keystone');
const async = require('async');

module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Init locals
  locals.section = 'entries';
  locals.title = 'Einträge';
  locals.filters = {
    tag: req.params.tag,
  };
  locals.data = {
    entries: [],
    tags: [],
    activeTag: req.params.tag,
  };

  // Load all categories
  view.on('init', (next) => {
    keystone.list('Tag').model.find().sort('name').exec((err, results) => {
      if (err || !results.length) {
        return next(err);
      }
      locals.data.tags = results;

      // Load the counts for each category
      async.each(locals.data.tags, (tag, next) => {
        keystone.list('Entry').model.count().where('tags').in([tag.id]).exec((err, count) => {
          tag.entryCount = count; // eslint-disable-line no-param-reassign
          next(err);
        });
      }, next);
    });
  });

  // Load the current category filter
  view.on('init', (next) => {
    if (req.params.tag) {
      keystone.list('Tag').model.findOne({ slug: locals.filters.tag }).exec((err, result) => {
        locals.data.tag = result;
        next(err);
      });
    } else {
      next();
    }
  });

  // Load the posts
  view.on('init', (next) => {
    const q = keystone.list('Entry').paginate({
      page: req.query.page || 1,
      perPage: 100,
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

    q.exec((err, results) => {
      locals.data.entries = results;
      next(err);
    });
  });

  // Render the view
  view.render('entries');
};
