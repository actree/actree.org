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

Template.createComment.rendered = function() {
    $("#comment-form").validate({
        submitHandler: function(form, event) {
            let comment = {
              title: event.target.title.value,
              text: event.target.text.value,
              postId: event.target.postId.value,
              createdAt: new Date(),
              published: true
            };

            if(Meteor.userId()) {
              comment.createdBy = Meteor.userId();
            }

            Meteor.call('createComment', comment, (error, response) => {
              if(error) {
                Bert.alert( error.reason, "warning" );
              } else {
                Bert.alert( 'Danke für deinen Kommentar!', 'info', 'growl-top-right' );
                Session.set('showCreateComment', false);
              }
            });
        }
    });
}

Template.createComment.events({
    'submit #comment-form': (event) => {
        event.preventDefault();
    },
    'click .cancel': () => {
        Session.set('showCreateComment', false);
    }
})
