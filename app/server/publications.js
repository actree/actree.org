Meteor.publish('posts', function() {
	if (/*Roles.userIsInRole(this.userId, ['author', 'guest', 'admin'])*/ false) {
    	return Posts.find({});
  	} else {
  		return Posts.find({published: true});
    }
});

Meteor.publish('comments', function() {
  return Comments.find({});
    if (/*Roles.userIsInRole(this.userId, ['author', 'admin'])*/ false) {
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

Meteor.publish('Meteor.users', function() {
	return Meteor.users.find({}, {
        fields: {
            profile: 1,
            username: 1
        }
    });
});

Meteor.publish('tags', function() {
  return Entry.rawCollection().distinct("tags", {});
});
