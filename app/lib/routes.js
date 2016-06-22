Router.configure({
    layoutTemplate: 'index',
    notFoundTemplate: 'notFound'
});


if(Meteor.isClient){

    Router.route( 'home', {
      path: '/',
      template: 'home',
      subscriptions: function() {
        return Meteor.subscribe('entry');
      }
    });

    Router.route('/styleguide');

    Router.route( 'entries', {
      path: '/browse/:tag',
      template: 'categories',
      data: function() {
          return {activeTag: this.params.tag}
      },
      subscriptions: function() {
        // We can return a single subscription, or an array of subscriptions here.
        const activeTag = this.params.tag;
        return Meteor.subscribe( 'entry', activeTag );
      }
    });

    Router.route( 'entries-latest', {
      path: '/browse',
      template: 'categories',
      data: function() {
          return {activeTag: null}
      },
      subscriptions: function() {
        // We can return a single subscription, or an array of subscriptions here.
        return Meteor.subscribe( 'entry', null );
      }
    });

    Router.route('/blog');
    Router.route('/entry/:slug', {
        path: "/entry/:slug",
        template: "entry",
        data: function() {
            const item = Entry.findOne({slug: this.params.slug});
            return item;
        },
        subscriptions: function() {
            return Meteor.subscribe("entry-single", this.params.slug)
        }
    });
    Router.route('blog-post', {
        path: '/blog/:slug',
        template: 'blogPost',
        data: function() {
            const post = Posts.findOne({slug: this.params.slug});
            return post;
        },
        subscriptions: function() {
            const post = Posts.findOne({slug: this.params.slug});
            return [
                Meteor.subscribe("comments", post._id)
            ];
        }
    });

    // Router.route('/login', function() { this.render('login') }, {
    //     name: "login"
    // } );

    // Router.onBeforeAction(function() {
    //     if (!Meteor.userId()) {
    //         // if the user is not logged in, render the Login template
    //         // TODO: should be admin or author or guest
    //         this.render('login');
    //     } else {
    //         // otherwise don't hold up the rest of hooks or our route/action function
    //         // from running
    //         this.next();
    //     }
    // }, {
    //   only: ['admin', 'admin.users', 'admin.posts']
    //   // or except: ['routeOne', 'routeTwo']
    // });
}
