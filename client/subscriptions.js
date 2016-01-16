Meteor.subscribe('posts');
Meteor.subscribe('comments');
// Accounts.validateNewUser(function (user) {
//   var loggedInUser = Meteor.user();

//   if (Roles.userIsInRole(loggedInUser, ['admin'])) {
//     // NOTE: This example assumes the user is not using groups. 
//     return true;
//   }

//   throw new Meteor.Error(403, "Not authorized to create new users");
// });