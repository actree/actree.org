var FEATURED_COUNT = 4;

Template.blog.helpers({  
  latestPosts: () => Posts.latest()
});

Template.blogpostExcerpt.helpers({
	author: function() {
		return Meteor.users.find({_id: this.createdBy}).username;
	}
})

Template.blogpostExcerpt.rendered = function() {
	$.fn.matchHeight._update();
}