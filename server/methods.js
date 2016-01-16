Meteor.methods({
	/* Posts */
    'createPost': function() {
        return Posts.insert({title: 'test'});
    },

    'updatePost': function(id, post) {
    	Posts.update({_id: id}, {$set: post});
    },

    'publishPost': function(id) {
    	var post = Posts.find({_id: id});
    	if(post.publishedAt) {
    		Posts.update({_id: id}, {$set: {published: true}});
    	} else {
    		Posts.update({_id: id}, {$set: {published: true, publishedAt: new Date()}});
    	}
    },

    'unpublishPost': function(id) {
        Posts.update({_id: id}, {$set: {published: false}});
    },

    /* Comments */
    'createComment': function(comment) {
        return Comments.insert(comment);
    },

    'unpublishPost': function(id) {
        Posts.update({_id: id}, {$set: {published: false}});
    },

});
