Template.comment.helpers({
    author: function() {
        if(this.createdBy) {
            // Registered user
            var user = Meteor.users.findOne({_id: this.createdBy});
            return user.profile.name;
        } else {
            // Anonymous user
            return this.author.name;
        }
    },
    mine: function() {
        return false;
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
              content: event.target.text.value,
              postId: event.target.postId.value,
              published: false
            };

            if(Meteor.userId()) {
              comment.author = {
                  name: Meteor.userId(),
                  email: Meteor.userId()
              }
          } else {
              comment.author = {
                  name: event.target.name.value,
                  email: event.target.email.value
              }
          }

            Meteor.call('createComment', comment, (error, commentId) => {
              if(error) {
                Bert.alert( error.reason, "Leider konnten wir deinen Kommentar nicht aufnehmen! Versuche es doch später noch einmal." );
              } else {
                // Bert.alert( 'Danke für deinen Kommentar!', 'info', 'growl-top-right' );
                Session.set("showCreateComment", false);
                Session.set("showUnpublishedComment", true);
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
