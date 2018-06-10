/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const middleware = require('./middleware');
const rss = require('keystone-rss');

const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
module.exports = (app) => {
  // Views
  app.get('/', routes.views.index);

  app.get('/blog/', routes.views.blog);
  app.get('/blog/category/:category', routes.views.blog);
  app.all('/blog/:post', routes.views.post);

  app.get('/entries/', routes.views.entries);
  app.get('/entries/tag/:tag', routes.views.entries);
  app.get('/entries/:entry', routes.views.entry);

  app.get('/actree/:page', routes.views.page);
  app.get('/maps/', routes.views.maps);

  /* RSS Feeds */
    app.get('/feed.xml', function (req, res) {
        rss.create(keystone, req, res, {
            /* The model that is the subject of the feed */
            model: 'Post',

            /* RSS Feed meta data */
            meta: {
                title: 'actree Blog',
                description: 'Blog mit Tipps, Tricks und Rezensionen zum Thema Nachhaltigkeit',
                feed_url: 'https://actree.org/feed.xml',
                site_url: 'https://actree.org',
                // image_url: 'https://feed.image.url',
                managingEditor: 'actree e.V. <info@actree.org>',
                webMaster: 'Tim von Oldenburg <actree@tvooo.de>',
                copyright: '2018 actree e.V.',
                language: 'de',
                // categories: ['Category 1', 'Category 2', 'Category 3'],
                // pubDate: 'Jan 1, 2017 12:00:00 GMT',
            },

            /* The url prefix for posts within the feed (the post slug is appended to this) */
            url: 'https://actree.org/blog/',
        });
    });

  // app.get('/gallery', routes.views.gallery);
  // app.all('/contact', routes.views.contact);

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);
};
