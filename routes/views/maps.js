const keystone = require('keystone');

module.exports = (req, res) => {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Set locals
  locals.section = 'maps';

  // Render the view
  view.render('maps');
};
