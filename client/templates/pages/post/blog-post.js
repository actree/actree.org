Template.blogPost.helpers({
  comments: function(postId) {
    return Comments.for(this._id);
  },
  commentCount: function(postId) {
    return Comments.for(this._id).count();
  }
});
