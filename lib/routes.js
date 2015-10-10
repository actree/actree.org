Router.configure({
    layoutTemplate: 'index',
    notFoundTemplate: 'notFound'
});

Router.route('/', function() {
    this.render('home');
});

Router.route('/blog');
Router.route('/blog/:slug', function () {
    var item = Posts.findOne({slug: this.params.slug});
    this.render('blogPost', {data: item});
});
Router.route('/admin/posts/:_id/edit', function () {
    var item = Posts.findOne({_id: this.params._id});
    if(!item) {
        itemId = Posts.create();
        return this.redirect('/admin/posts/' + itemId + '/edit');
    }
    this.render('createPost', {data: item});
});

Router.route('/admin', function() { this.render('admin') }, {
    name: "admin"
} );
Router.route('/admin/users', function() { this.render('adminUsers') }, {
    name: "admin.users"
} );
Router.route('/admin/posts', function() { this.render('adminPosts') }, {
    name: "admin.posts"
} );

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        // TODO: should be admin or author or guest
        this.render('home');
    } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
    }
}, {
  only: ['admin', 'admin.users', 'admin.posts']
  // or except: ['routeOne', 'routeTwo']
});