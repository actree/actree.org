var FEATURED_COUNT = 4;

Template.blog.helpers({  
  latestPosts: () => Posts.latest()
});