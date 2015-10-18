Template.comment.helpers({
    author: function() {
        return Meteor.users.findOne({_id: this.createdBy}).username;
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
        event.preventDefault();
        // Meteor.loginWithPassword(event.target.email.value, "password", function() {
        //     Session.set('showLogin', false);
        // });
        Comments.create({
            title: event.target.title.value,
            text: event.target.text.value,
            postId: event.target.postId.value
        });
    }
})