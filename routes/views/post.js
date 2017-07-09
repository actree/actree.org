const keystone = require('keystone');
const helpers = require('../../templates/views/helpers')();

const Comment = keystone.list('Comment');

exports = module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Set locals
  locals.section = 'blog';
  locals.filters = {
    post: req.params.post,
  };
  locals.data = {
    posts: [],
  };

  // Load the current post
  view.on('init', (next) => {
    const q = keystone.list('Post').model.findOne({
      // state: 'published',
      slug: locals.filters.post,
    }).populate('author category');

    q.exec((err, result) => {
      locals.data.post = result;
      locals.meta = {
        title: result.title,
        description: result.content.brief,
        url: helpers.fullPostUrl(locals.filters.post),
        image: '',
      };
      next(err);
    });
  });

  // // Load other posts
  // view.on('init', (next) => {
  //   const q = keystone.list('Post').model
  //     .find().where('state', 'published')
  //     .sort('-publishedDate')
  //     .populate('author')
  //     .limit('4');
  //
  //   q.exec((err, results) => {
  //     locals.data.posts = results;
  //     next(err);
  //   });
  // });

  // Load post comments
  view.on('init', (next) => {
    const q = keystone.list('Comment').model
      .find({ post: locals.data.post.id })
      .where('state', 'published')
      .sort('-publishedDatetime')
      .populate('author');
      // .limit('4');

    q.exec((err, results) => {
      locals.data.comments = results;
      next(err);
    });
  });

  // On POST requests, add the Comment to the database
  view.on('post', { action: 'comment' }, (next) => {
    const newComment = new Comment.model({
      post: locals.data.post.id,
    });
    const updater = newComment.getUpdateHandler(req);

    console.log(req.body);
    // next();
    updater.process(req.body, {
      flashErrors: true,
      fields: 'content, anonymousAuthor.name, anonymousAuthor.email',
      errorMessage: 'There was a problem submitting your enquiry:',
    }, (err) => {
      if (err) {
        console.log(JSON.stringify(err));
        locals.validationErrors = err.errors;
      } else {
        locals.commentSubmitted = true;
      }
      next();
    });
  });

  // Render the view
  view.render('post');
};
