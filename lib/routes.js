Router.configure({
    layoutTemplate: 'index',
    notFoundTemplate: 'notFound'
});

if(Meteor.isClient){

Router.route('/', function() {
  var item = Entry.findOne({});
  this.render('home', {data: item});
});

Router.route('/styleguide');
Router.route('/browse', function() {
    this.render('categories');
});

Router.route('/blog');
Router.route('/entry', function () {
    var item = Entry.findOne({});
    this.render('entry', {data: item});
});
Router.route('/blog/:slug', function () {
    var item = Posts.findOne({slug: this.params.slug});
    this.render('blogPost', {data: item});
});
Router.route('/admin/posts/:_id/edit', function () {
    var item = Posts.findOne({_id: this.params._id});
    // if(!item) {
    //     itemId = Meteor.call('createPost');
    //     console.log(itemId);
    //     return this.redirect('/admin/posts/new/edit');
    // }
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
}
