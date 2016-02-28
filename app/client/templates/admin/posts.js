var POST_CATEGORIES = {
    "meta": "In eigener Sache",
    "topic": "Thema",
    "experience": "Erfahrungsbericht",
    "event": "Events & Lokales"
};

function getRole(userId) {
    var user = Meteor.users.findOne(userId);
    if(!user) {
        return false;
    }

    if(user.profile && user.profile.role) {
        return user.profile.role;
    }

    return false;
}

Template.adminPosts.helpers({
    posts: () => Posts.find({}, {sort: {createdAt: -1}})
});

function hasEditRights(doc) {
    var userId = Meteor.userId(),
        authorId = doc.createdBy;

    if(Roles.userIsInRole(userId, ['admin'])) {
        return true;
    }
    if(Roles.userIsInRole(userId, ['author']) && userId === authorId) {
        return true;
    }
    if(Roles.userIsInRole(userId, ['guest']) && userId === authorId && doc.published === false) {
        return true;
    }

    return false;
}

function hasPublishRights(doc) {
    var userId = Meteor.userId(),
        authorId = doc.createdBy;

    if(Roles.userIsInRole(userId, ['admin'])) {
        return true;
    }
    if(Roles.userIsInRole(userId, ['author']) && userId === authorId) {
        return true;
    }
    return false;
}

Template.adminPost.helpers({
    canEdit: (doc) => {
        return hasEditRights(doc)
    },

    canPublish: (doc) => {
        return !doc.published && hasPublishRights(doc);
    },

    canUnpublish: (doc) => {
        return doc.published && hasPublishRights(doc);
    },

    getAuthor: (authorId) => {
        var author = Meteor.users.findOne(authorId);
        if(author) {
            return author.username;
        }
        return "n/a";
    }
});

Template.adminPosts.events({
    'click .create-post': function(event) {
        event.preventDefault();
        var itemId = Meteor.call('createPost');
        console.log(itemId);
        Router.go('/admin/posts/' + itemId + '/edit');
    }
})

Template.adminPost.events({
    'click .publish-post': function(event) {
        event.preventDefault();
        Meteor.call('publishPost', this._id);
    },

    'click .unpublish-post': function(event) {
        event.preventDefault();
        Meteor.call('unpublishPost', this._id);
    },

    'click .delete-post': function(event) {
      event.preventDefault();
      Meteor.call('deletePost', this._id);
    }
})

Template.createPost.events({
    'click .save-post': (event, template) => {
        console.log(template)
        console.log(this.$('#post-slug'));

        var postId = template.data._id;
        var post = {
            title: this.$('#post-title').get(0).value,
            summary: this.$('#post-summary').get(0).value,
            slug: this.$('#post-slug').get(0).value,
            text: this.$('#post-text').get(0).value
        };
        Meteor.call('updatePost', postId, post);
    }
})
