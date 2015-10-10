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

    // if(user.admin) {
    //     return "admin";
    // }

    if(user.profile && user.profile.role) {
        return user.profile.role;
    }

    return false;
}

Template.adminPosts.helpers({
    posts: () => Posts.find({}, {sort: {createdAt: -1}})
});

Template.adminPost.helpers({
    canEdit: (doc) => {
        var role = getRole(Meteor.userId()),
            authorId = doc.createdBy;

        if(!role) {
            return false;
        }

        return role === "admin" // admin, can edit anything
            || (role === "author" && Meteor.userId() === authorId) // author, can edit own post
            || (role === "guest" && Meteor.userId() === authorId && doc.published === false) // guest author, can edit own post, but only when it's not published
        ;
    },
    canPublish: (doc) => {
        var role = getRole(Meteor.userId()),
            authorId = doc.createdBy;

        if(!role || doc.published) {
            return false;
        }

        return role === "admin" // admin, can publish anything
            || (role === "author" && Meteor.userId() === authorId) // author, publish own post
        ;
    },
    canUnpublish: (doc) => {
        var role = getRole(Meteor.userId()),
            authorId = doc.createdBy;

        if(!role || !doc.published) {
            return false;
        }

        return role === "admin" // admin, can publish anything
            || (role === "author" && Meteor.userId() === authorId) // author, publish own post
        ;
    },
    getAuthor: (authorId) => {
        var author = Meteor.users.findOne(authorId);
        if(author) {
            return author.username;
        }
        return "n/a";
    },
    formatDate: (timestamp) => moment(timestamp).format("DD.MM.YYYY HH:mm")
});

Template.adminPost.events({
    //'click .save-post': function() { console.log("Saved post"); },
    'click .publish-post': function(event) {
        event.preventDefault();
        Posts.update({_id: this._id}, {$set: {published: true}});
    },
    'click .unpublish-post': function(event) {
        event.preventDefault();
        Posts.update({_id: this._id}, {$set: {published: false}});
    }
})

Template.createPost.events({
    'click .save-post': (event, template) => {
        console.log(template)
        console.log(this.$('#post-slug'));

        var postId = template.data._id;
        var post = {
            title: this.$('#post-title').get(0).value,
            slug: this.$('#post-slug').get(0).value,
            text: this.$('#post-text').get(0).value
        };
        Posts.update({_id: postId}, {$set: post});
    }
})