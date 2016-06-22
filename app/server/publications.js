Meteor.publish('posts', function() {
	if (/*Roles.userIsInRole(this.userId, ['author', 'guest', 'admin'])*/ false) {
    	return Posts.find({});
  	} else {
  		return Posts.find({published: true});
    }
});

Meteor.publish('comments', function(postId) {
    const publishFields = {
        content: true,
        createdBy: true,
        "author.name": true,
        createdAt: true,
        published: true,
        postId: true
    };

    if(postId) {
        return Comments.find({
            published: true,
            postId: postId
        }, {
            fields: publishFields
        });
    } else {
        return Comments.find({
            published: true
        }, {
            fields: publishFields
        });
    }
});

Meteor.publish('entry', function(tag) {
    if(tag) {
        return Entry.find({published: true, tags: tag})
    } else {
        return Entry.find({published: true}, {sort: {createdAt: -1}, limit: 10});
    }
});

Meteor.publish('entry-single', function(slug) {
    if(slug) {
        return Entry.find({published: true, slug: slug})
    }
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
