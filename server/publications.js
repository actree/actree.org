Meteor.publish('posts', function() {
	if (Roles.userIsInRole(this.userId, ['author', 'guest', 'admin'])) {
    	return Posts.find({});
  	} else {
  		return Posts.find({published: true});
    }
});

Meteor.publish('comments', function() {
    if (Roles.userIsInRole(this.userId, ['author', 'admin'])) {
    	return Comments.find({});
  	} else {
  		return Comments.find({published: true});
    }
});
