/*
 * User roles:
 *  - user: can't do anything
 *  - guest (guest author): can create post, edit own post (only if not published); needs to be deleted/published by admin
 *  - author (author): can create post, edit, delete, publish only own posts
 *  - admin: can do anything
 *
 */

// DANGER ZONE
// Set admin flag automatically for the following email adresses

// var USER_ROLES = [
//     "user",
//     "guest",
//     "author",
//     "admin"
// ];

// var adminEmails = ["tim@tvooo.de", "beccy@ruehle.eu", "info@actree.org"];

// Meteor.users.after.insert(function (userId, doc) {
//     doc.createdAt = Date.now();
    
//     if(adminEmails.indexOf(doc.emails[0].address) > -1) {
//         doc.admin = true;
//     }

//     if(!doc.profile) {
//         doc.profile = {};
//     }
    
//     doc.profile.role = "user";
//     if(doc.admin) {
//         doc.profile.role = "admin";
//     }
// });

// Meteor.users.allow({
//   update: function(currentUserId, user) {
//     var currentUser = Meteor.users.findOne(userId);
//     return user._id === currentUserId || (currentUser && currentUser.profile.role == "admin"); // We can update users if we're the user, or if we're an admin
//   }
// });

