Comments = new Mongo.Collection('comments');

Comments.allow({
  insert: function (userId, comment) {
    return comment.createdBy === userId;
  },
  remove: function (userId, comment) {
    return comment.createdBy === userId;
  },
  update: function(userId, comment) {
    return comment.createdBy === userId;
  }
});

Comments.mine = function() {
  return Comments.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
}

Comments.for = function(postId) {
  return Comments.find({postId: postId, published: true}, {sort: {createdAt: -1}});
}

Comments.create = function(comment) {
  return Comments.insert({
    createdBy: Meteor.userId(),
    published: false,
    title: comment.title,
    text: comment.text,
    postId: comment.postId
  });
}

// TODO: Should unpublish comment if it gets updated