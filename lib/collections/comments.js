Comments = new Mongo.Collection('comments');

Comments.mine = function() {
  return Comments.find({createdBy: Meteor.userId()}, {sort: {createdAt: -1}});
}

Comments.for = function(postId) {
  console.log(postId)
  return Comments.find({postId: postId, published: true}, {sort: {createdAt: -1}});
}


// TODO: Should unpublish comment if it gets updated
