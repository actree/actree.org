const keystone = require('keystone');
// const helpers = require('../../templates/views/helpers')();

module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Set locals
  locals.section = 'maps';
  // locals.filters = {
  //   page: req.params.page,
  // };
  locals.data = {};

  // Load the current post
  // view.on('init', function (next) {
  //   var q = keystone.list('Page').model.findOne({
  //   slug: locals.filters.page,
  //   });
    //
  //   q.exec(function (err, result) {
  //   locals.data.page = result;
    //         locals.meta = {
    //             // title: result.title,
    //             // description: result.content.brief,
    //             // url: helpers.fullPostUrl(locals.filters.post),
    //             // image: ""
    //         }
  //   next(err);
  //   });
    //
  // });

  // Render the view
  view.render('maps');
};
