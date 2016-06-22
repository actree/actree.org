/* Global template helpers */

Template.registerHelper('formatDate', function(timestamp){
    return moment(timestamp).format("DD.MM.YYYY HH:mm")
});

Template.registerHelper('formatDay', function(timestamp){
    return moment(timestamp).format("DD.MM.YYYY")
});

Template.registerHelper('username', function(){
    if(Meteor.user()) {
        return Meteor.user().username;
    }
    return false;
});

Template.registerHelper('usernameFor', function(id) {
        var user = Meteor.users.findOne(id);
        if(user) {
            return user.username;
        }
        return "n/a";
});

Template.registerHelper('nameFor', function(id) {
        var user = Meteor.users.findOne(id);
        if(user) {
            if(user.profile.name) {
                return user.profile.name;
            }
            return user.username;
        }
        return "n/a";
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('slugify', function(str) {
    return slugify(str);
});
