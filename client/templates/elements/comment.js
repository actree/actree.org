Template.comment.helpers({
    author: function() {
        var user = Meteor.users.findOne({_id: this.createdBy});
        return user ? user.profile.name : 'Anonymous';
    },
    mine: function() {
        return this.createdBy === Meteor.userId();
    }
});

Template.comment.events({
    'click .delete-comment': function(event) {
        console.log(this);
        console.log(event);
        Comments.remove({_id: this._id});
    }
})

Template.createComment.events({
    'submit .comment-form': (event) => {
        console.log('jo')
        event.preventDefault();
        Meteor.call('createComment', {
            title: event.target.title.value,
            text: event.target.text.value,
            postId: event.target.postId.value,
            published: true
        });
    }
})