const keystone = require('keystone');

exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  locals.section = 'home';

  locals.data = {
    posts: [],
    entries: [],
    categories: [],
  };

  // Load all categories
  view.on('init', (next) => {
    const q = keystone.list('Post').model.find()
            .where('state', 'published')
            .populate('category')
            .sort('-publishedDate')
            .limit(5)
            ;

    q.exec((err, posts) => {
      locals.data.posts = posts;
      next(err);
    });
  });

  view.on('init', (next) => {
    const q = keystone.list('Entry').model.find()
            .where('state', 'published')
            // .populate('tags')
            .populate({
              path: 'tags',
                // TODO: only show the 3 most popular ones?
                // match: { age: { $gte: 21 }},
              options: { limit: 3 },
            })
            .sort('-publishedDate')
            .limit(10)
            ;

    q.exec((err, entries) => {
      locals.data.entries = entries;
      next(err);
    });
  });

  // Render the view
  view.render('index');
};
