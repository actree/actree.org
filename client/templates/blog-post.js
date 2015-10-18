Template.blogPost.helpers({
  comments: (postId) => Comments.for(postId)
});