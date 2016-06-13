Template.blogPost.helpers({
  comments: function(postId) {
    return Comments.for(this._id);
  },
  commentCount: function(postId) {
    return Comments.for(this._id).count();
  },
  showCreateComment: function() {
    return Session.get('showCreateComment')
},
    showUnpublishedComment: function() {
        return Session.get("showUnpublishedComment")
    }
});

Template.blogPost.events({
  'click .js-toggle-comment': function() {
    Session.set('showCreateComment', true);
  }
})
