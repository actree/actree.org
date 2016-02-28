Meteor.publish('posts', function() {
	if (Roles.userIsInRole(this.userId, ['author', 'guest', 'admin'])) {
    	return Posts.find({});
  	} else {
  		return Posts.find({published: true});
    }
});

Meteor.publish('comments', function() {
  return Comments.find({});
    if (Roles.userIsInRole(this.userId, ['author', 'admin'])) {
    	return Comments.find({});
  	} else {
  		return Comments.find({published: true});
    }
});

Meteor.publish('entry', function() {
    // if (Roles.userIsInRole(this.userId, ['author', 'admin'])) {
    	return Entry.find({});
  	// } else {
  		// return Comments.find({published: true});
    // }
});
