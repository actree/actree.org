/* Global template helpers */

Template.registerHelper('formatDate', function(timestamp){
    return moment(timestamp).format("DD.MM.YYYY HH:mm")
});

Template.registerHelper('username', function(){
    if(Meteor.user()) {
        return Meteor.user().username;
    }
    return false;
});